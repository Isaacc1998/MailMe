import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

const SignoutMenu = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    return history.push("/login");
  };
  return (
    <Menu autoSelect={false}>
      <MenuButton
        sx={{ backgroundColor: "lightcoral", paddingRight: "10px" }}
        as={Button}
        leftIcon={<HamburgerIcon />}
        rightIcon={<ChevronDownIcon />}
        _active={{
          backgroundColor: "lightcoral",
        }}
      >
        <span style={{ marginRight: "30px" }}>
          {currentUser && currentUser.username}
        </span>
      </MenuButton>
      <MenuList bgColor="pink">
        <MenuItem
          _hover={{ bgColor: "pink" }}
          color="black"
          fontWeight={700}
          onClick={logoutUser}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default SignoutMenu;
