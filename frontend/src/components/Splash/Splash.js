import { Link } from "react-router-dom";
import LoginForm from "../SessionForms/LoginForm";
import SignupFormModal from "../SessionForms/SignupFormModal";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { VscGithubInverted } from "react-icons/vsc";
import { TbBrandLinkedin } from "react-icons/tb";
import Logo from "./Logo";
import "./Splash.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Splash() {
  return (
    <>
      <div className="container">
        <div className="developer-links">
          <div className="william-links">
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor={"white"}
                _hover={{ bg: "cyan.200" }}
                rightIcon={<ChevronDownIcon />}
              >
                William Chan
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <a target="./" href="https://github.com/wc2184">
                    <VscGithubInverted
                      size="28px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://github.com/wc2184"
                      alt="William's Github"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a target="./" href="https://github.com/wc2184">
                    <span>William's Github</span>
                  </a>
                </MenuItem>
                <MenuItem minH="40px">
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/william-chan-3bb674194/"
                  >
                    <TbBrandLinkedin
                      size="30px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://placekitten.com/120/120"
                      alt="William's LinkedIn"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/william-chan-3bb674194/"
                  >
                    <span>William's LinkedIn</span>
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="isaac-links">
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor={"white"}
                _hover={{ bg: "cyan.200" }}
                rightIcon={<ChevronDownIcon />}
              >
                Isaac Choi
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <a target="./" href="https://github.com/Isaacc1998">
                    <VscGithubInverted
                      size="28px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://github.com/Isaacc1998"
                      alt="Isaac's Github"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a target="./" href="https://github.com/Isaacc1998">
                    <span>Isaac's Github</span>
                  </a>
                </MenuItem>
                <MenuItem minH="40px">
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/isaac-choi-38636723b/"
                  >
                    <TbBrandLinkedin
                      size="30px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://www.linkedin.com/in/isaac-choi-38636723b/"
                      alt="Isaac's LinkedIn"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/isaac-choi-38636723b/"
                  >
                    <span>Isaac's LinkedIn</span>
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="shawn-links">
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor={"white"}
                _hover={{ bg: "cyan.200" }}
                rightIcon={<ChevronDownIcon />}
              >
                Shawn Mallon
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <a target="./" href="https://github.com/lokisk1155">
                    <VscGithubInverted
                      size="28px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://github.com/lokisk1155"
                      alt="Shawn's Github"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a target="./" href="https://github.com/lokisk1155">
                    <span>Shawn's Github</span>
                  </a>
                </MenuItem>
                <MenuItem minH="40px">
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/shawn-mallon-3050b7161/"
                  >
                    <TbBrandLinkedin
                      size="30px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://www.linkedin.com/in/shawn-mallon-3050b7161/"
                      alt="Shawn's LinkedIn"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/shawn-mallon-3050b7161/"
                  >
                    <span>Shawn's LinkedIn</span>
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className="kyungmin-links">
            <Menu>
              <MenuButton
                as={Button}
                backgroundColor={"white"}
                _hover={{ bg: "cyan.200" }}
                rightIcon={<ChevronDownIcon />}
              >
                Kyungmin Lee
              </MenuButton>
              <MenuList>
                <MenuItem minH="48px">
                  <a target="./" href="https://github.com/KmLee7">
                    <VscGithubInverted
                      size="28px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://github.com/KmLee7"
                      alt="Kyungmin's Github"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a target="./" href="https://github.com/KmLee7">
                    <span>Kyungmin's Github</span>
                  </a>
                </MenuItem>
                <MenuItem minH="40px">
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/kyungmin-lee-1767a6255/"
                  >
                    <TbBrandLinkedin
                      size="30px"
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://www.linkedin.com/in/kyungmin-lee-1767a6255/"
                      alt="Kyungmin's LinkedIn"
                      mr="12px"
                    />
                  </a>
                  <div style={{ width: 10 }}></div>
                  <a
                    target="./"
                    href="https://www.linkedin.com/in/kyungmin-lee-1767a6255/"
                  >
                    <span>Kyungmin's LinkedIn</span>
                  </a>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="top-container">
          <div className="top-container-left">
            <Logo />
          </div>
          <div className="RIGHT">
            <div className="top-container-right">
              <LoginForm />
            </div>
            <div style={{ height: 15 }}></div>
            <div className="splash-signup">
              <SignupFormModal />
            </div>
          </div>
        </div>
        {/* <div className="bottom-container">
          <div className="bottom-container-left">DEMO VIDEO HERE</div>
          <div className="bottom-container-right"></div>
        </div> */}
        <footer>Copyright &copy; 2022 MailMe</footer>
      </div>
    </>
  );
}

export default Splash;
