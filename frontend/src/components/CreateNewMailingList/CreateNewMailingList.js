import { FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMailingList } from "../../store/mailinglist";
function CreateNewMailingList({ onClose }) {
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user._id);
  const ref = useRef(null);

  const createMailingListFormSubmit = (e) => {
    e.preventDefault();
    console.log("email created");
    let emailsArray = emails.split(", ");
    let obj = {
      name: name,
      owner: currentUserId,
      emails: emailsArray,
    };
    dispatch(createMailingList(obj))
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "this is submitted email data real quick");
      });
    // add onClose later
    // let params = {
    //     mailingListId: // this would be the id ,
    //     title,
    //     content: body
    // }
    // dispatch(createPost(params))
  };
  useEffect(() => {
    console.log(ref.current, "this is current");
    ref.current.focus();
  }, []);
  return (
    <>
      <form
        className="create-email-form"
        onSubmit={createMailingListFormSubmit}
      >
        <FormLabel>
          <Input
            ref={ref}
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Name of mailing list"
          />
        </FormLabel>
        <FormLabel>
          <Textarea
            value={emails}
            onChange={(e) => setEmails(e.currentTarget.value)}
            placeholder="Enter emails, comma seperated like example@example.com, sample@sample.com, demo@demo.io"
            h="300px"
            _placeholder={{
              textAlign: "center",
            }}
          />
        </FormLabel>
        <Button type="submit">Create Mailing List</Button>
      </form>
    </>
  );
}

export default CreateNewMailingList;
