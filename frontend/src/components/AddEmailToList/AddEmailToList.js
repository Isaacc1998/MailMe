import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateMailingList } from "../../store/mailinglist";
import ButtonForAddEmailModal from "../ButtonForAddEmail/ButtonForAddEmailModal";

const AddEmailToList = () => {
  const dispatch = useDispatch(0);
  const currentMailingList = useSelector(
    (state) => state.mailingLists.currentMailingList
  );
  console.log(currentMailingList, "THIS THIS");
  return <ButtonForAddEmailModal />;
};
export default AddEmailToList;
