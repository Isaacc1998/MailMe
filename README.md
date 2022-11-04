# MailMe

https://mailmeaa.herokuapp.com/
## Code snippets:

### - Obtains the current mailing list via the URL's pathname params asynchronously by dispatching an action to a thunk, then hydrates the data only after the thunk's fetch is successful, showing each individual email subscribed as well as a button to remove the email.
```javascript
const [loading, setLoading] = useState(true);
const { _id } = useParams();
 const currentMailingList = useSelector((state) => state.mailingLists.currentMailingList);

useEffect(() => {
  if (_id) dispatch(getMailingList(_id))
}, [dispatch, _id]);

{currentMailingList &&
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
})}
```

### The router method for deleting mailing lists first deletes any dependencies (posts) by first retrieving all posts with a mailing list id foreign key that matches the ":mailinglistId" wildcard passed in, and subsequently deleting those posts before finally removing the mailing list itself.
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

### The handler method for starting tutorial and skipping tutorial buttons. Setting a key 'show' to false in the local storage when clicked skip tutorial and setting it to true when clicked start tutorial. 

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
