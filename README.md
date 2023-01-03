# [Mailme Live](https://mailmeaa.herokuapp.com/)

# Technologies

## [Nodemailer](https://nodemailer.com/about/) is a module for Node.js applications to allow email sending

### Engineer: Shawn Mallon

Email data is gathered via form; Inside of CreateEmailForm.js
handleSend will dispatch a thunk request to /sendmail. The gathered data from the form is stored inside the body of the request.

```javascript
const handleSend = async (e) => {
    e.preventDefault();
    let time = `${seconds} ${minutes} ${hour} ${dayOfMonth} ${month} *`
    let addresses = currentList.emails;
    await jwtFetch("/api/mail/sendmail", {
      method: "POST",
      body: JSON.stringify({ body, addresses, title, time }),
    });
    return dispatch(
      createPost({
        mailinglistId: currentList._id,
        title: title,
        content: body,
      })
    );
  };
```
/sendmail will return a promise of sendEmail containing the data based from CreateEmailForm.js
```javascript
router.post("/sendmail", cors(), async (req, res) => {
  const { body, addresses, title, time } = req.body;
  try {
    const to = addresses;
    const from = process.env.MAIL_FROM;
    const subject = title;
    const message = body  // message becomes an html esq doc 
    await sendEmail(subject, message, to, from, time);
    return res.json({ status: "sucess" });
  } catch (error) {
      return error.message;
  }
});
```
sendEmail will first create the transporter; which acts as the transfer agent using an SMTP(Simple Mail Transfer Protocol) port.
The options object represents the contents of the email itself, and who it will be sent to.
Once these are created, you can envoke the built in method "sendMail" on the transporter, passing options as an argument. 
```javascript
const sendEmail = async (subject, message, to, from, time) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.HOST_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: from,
        to: to,
        subject: subject,
        html: message,
        attachments: [{
            filename: 'temp.png',
            path: __dirname + '/emailAttachments/temp.png',
            cid: 'logo' 
        }],
    }
    cron.schedule(`${time}`, () => {
        transporter.sendMail(options, function(err, info) {
            err
             ? console.log(err) : console.log(info)
        })
    })
}
```
## [Intro.js](https://introjs.com/) is a lightweight JavaScript library for creating powerful customer onboarding tours
### Engineer: KM

set key 'show' for desired output inside of local storage on button click

```javascript
const handleSkipTutorial = (e) => {
  e.preventDefault();
  localStorage.setItem("show", false);

  setTimeout(() => {
    return history.push("/");
  }, 200);
};

const handleTutorial = (e) => {
  e.preventDefault();
  localStorage.setItem("show", true);

  setTimeout(() => {
    return history.push("/");
  }, 200);
};
```

When start tutorial is clicked, it sets the key "show" to true which then displays the onboarding tutorial on specific class name of a element you want to show.
Before starting the onboarding tutorial, we used setTimeout to wait until everything is rendered then set the key "show" to false after the tutorial steps are finished.

```javascript
let intro = introJs();
intro.setOptions({
  steps: [
    {
      element: ".list-name",
      intro: "This is the mailing list name",
      position: "bottom",
    },
    {
      element: ".list-number-emails",
      intro: "This is number of emails/subscribers in the mailing list",
      position: "bottom",
    },
    {
      element: ".number-of-emails-sent-out",
      intro: "This is number of emails sent out",
      position: "bottom",
    },
    {
      element: ".delete-list-tutorial",
      intro: "To delete a specific list",
      position: "bottom",
    },
    {
      element: ".create-new-mailing-list",
      intro: "This is to create a new mailing list",
      position: "bottom",
    },
    {
      element: ".search-container",
      intro: "This is to search mailing list",
    },
  ],
});
setTimeout(() => {
  if (localStorage.getItem("show") === "true") {
    intro.start();
  }
  localStorage.setItem("show", false);
  localStorage.setItem("show2", true);
}, 500);
```

# Featured Code

### Engineer: William Chan

- [code](https://github.com/Isaacc1998/MailMe/blob/main/frontend/src/components/HomePage/OneMailingList.js)

Show all emails subscribed to a specific mailing list after directing to a specific mailing list's page from the homepage. This is done efficiently by obtaining the mailing list's id from the URL; which will trigger our async thunk action from within our useEffect when our id extracted from useParams()'s evaluates to a truthy value. Using the logical && operator, the data will only be hydrated once the thunk action's fetch is successful casuing currentMailingList' to evaluate to a truthy value, which will then display our emails.

```javascript
const [loading, setLoading] = useState(true);
const { _id } = useParams();
const currentMailingList = useSelector(
  (state) => state.mailingLists.currentMailingList
);

useEffect(() => {
  if (_id) dispatch(getMailingList(_id));
}, [dispatch, _id]);

{
  currentMailingList &&
    currentMailingList.emails.map((mail) => {
      return (
        <Tr>
          <Td fontSize="20px">{mail}</Td>
          <Td isNumeric>
            <Box
              as={Button}
              colorScheme="red"
              className="deleteEmail"
              onClick={() => {
                return dispatch(
                  removeEmail({
                    mailingListId: currentMailingList._id,
                    email: mail.replace("\n", ""),
                  })
                ).then(() => {
                  toast({
                    title: `Email ${mail} has been deleted.`,
                    position: "bottom",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });

                  dispatch(getMailingList(_id));
                  dispatch(getUserMailingLists());
                });
              }}
            >
              Remove Email
            </Box>
          </Td>
        </Tr>
      );
    });
}
```

### Engineer: Issac Choi

- [code](https://github.com/Isaacc1998/MailMe/blob/main/backend/routes/api/mailinglists.js)

Deleting a mailing list will simultaneously delete the recorded history of all emails sent from the specific mailing list inside the database. The router method will first retrieve all emails with the matching mailing list id foreign key. Subsequently, the router method will delete the mailing list along with the retrieved emails from MongoDB.

```javascript
router.delete("/:mailinglistId", async (req, res, next) => {
  let list;
  let posts;
  try {
    list = await Mailinglist.findById(req.params.mailinglistId);
    posts = await Post.find({ list: req.params.mailinglistId });
    for (let i = 0; i < posts.length; i++) {
      posts[i].remove();
    }
    list.remove();
    return res.json(list);
  } catch {
    const error = new Error("Mailing List not found");
    error.statusCode = 404;
    error.errors = { message: "No mailing list found with that id" };
    return next(error);
  }
});
```
