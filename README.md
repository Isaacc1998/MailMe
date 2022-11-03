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
