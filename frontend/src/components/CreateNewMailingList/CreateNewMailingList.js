import { FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMailingList } from "../../store/mailinglist";
function CreateNewMailingList({ onClose }) {
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.user._id);
  const ref = useRef(null);
  const history = useHistory();

  const createMailingListFormSubmit = (e) => {
    e.preventDefault();

    let emailsArray = emails.replace("\n", "").split(", "); // basically a bug happening where \n aka newline was not letting things be deleted. textarea lets you newline. so i just replace all new lines with empty string - william
    let obj = {
      name: name,
      owner: currentUserId,
      emails: emailsArray,
    };
    dispatch(createMailingList(obj))
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          onClose();
          history.push("/mailinglist/" + data._id);
        }, 300);
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
            required
            value={emails}
            onChange={(e) => setEmails(e.currentTarget.value)}
            placeholder="Enter emails, comma seperated like example@example.com, sample@sample.com, demo@demo.io"
            h="300px"
            _placeholder={{
              textAlign: "center",
            }}
          />
        </FormLabel>
        <Button colorScheme="green" type="submit">
          Create Mailing List
        </Button>
      </form>
    </>
  );
}

export default CreateNewMailingList;
