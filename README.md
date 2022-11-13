# [Mailme Live](https://mailmeaa.herokuapp.com/)

# Technologies

## Nodemailer

- docs link
- description of the technology
- code example

## [Intro.js](https://introjs.com/)

is a lightweight JavaScript library for creating step-by-step and powerful customer onboarding tours

### Tutorial or Not

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
