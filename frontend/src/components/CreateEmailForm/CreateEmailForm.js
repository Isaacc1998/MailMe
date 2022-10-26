import { FormLabel, Input, Button, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
function CreateEmailForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();

  const createEmailFormSubmit = (e) => {
    e.preventDefault();
    console.log("email created");
    // add onClose later
    // let params = {
    //     mailingListId: // this would be the id ,
    //     title,
    //     content: body
    // }
    // dispatch(createPost(params))
  };
  return (
    <>
      <form className="create-email-form" onSubmit={createEmailFormSubmit}>
        <FormLabel>Create Email</FormLabel>
        <FormLabel>
          <Select placeholder="Choose mail list">
            <option>Single Mail List</option>
            <option>Single Mail List</option>
          </Select>
        </FormLabel>
        {/* <FormLabel>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Emails"
          />
        </FormLabel> */}
        <FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Title"
          />
        </FormLabel>
        <FormLabel>
          <Input
            type="textarea"
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            placeholder="Body"
            h="300px"
            _placeholder={{
              textAlign: "center",
            }}
          />
        </FormLabel>
        <Button type="submit">Create Mail</Button>
      </form>
    </>
  );
}

export default CreateEmailForm;
