import { FormLabel, Input, Button, Select, Textarea } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtFetch from "../../store/jwt";
import {
  getUserMailingLists,
  updateMailingList,
} from "../../store/mailinglist";
function ButtonForAddEmail({ onClose }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  const ref = useRef(null);
  // console.log(currentMailingList, " this is current mailing List");
  const addSubscriberSubmit = (e) => {
    e.preventDefault();
    console.log("email created");
    // add onClose later
    // let params = {
    //     mailingListId: // this would be the id ,
    //     email,
    //     content: body
    // }
    // dispatch(createPost(params))
    let obj = {
      mailinglistId: currentMailingList._id,
      name: currentMailingList.name,
      emails: [email],
    };
    dispatch(updateMailingList(obj))
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "this is data");

        onClose();
      });
  };

  useEffect(() => {
    ref.current.focus();
    console.log(ref.current, "LOOK ME MA");
  }, []);

  return (
    <>
      <form className="create-email-form" onSubmit={addSubscriberSubmit}>
        <FormLabel>Add a subscriber to {currentMailingList.name}</FormLabel>
        <FormLabel></FormLabel>
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
            ref={ref}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
            required
          />
        </FormLabel>

        <Button colorScheme="teal" type="submit">
          Add Subscriber
        </Button>
      </form>
    </>
  );
}

export default ButtonForAddEmail;
