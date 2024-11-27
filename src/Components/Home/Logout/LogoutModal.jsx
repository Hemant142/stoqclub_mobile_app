import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export default function LogoutModal({ isOpen, onClose, handleLogout, isLoggingOut }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        mx={{ base: "4", md: "auto" }} // Responsive horizontal margins
        maxW={{ base: "90%", md: "500px" }} // Responsive max width
        p={{ base: "6", md: "8" }} // Padding for better spacing
        bg="#262A33"
        borderRadius="10px" // Rounded corners
        boxShadow="lg" // Add a shadow for depth
      >
        <ModalHeader
          textAlign="center"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="white"
        >
          Logout
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody textAlign="center" fontSize={{ base: "sm", md: "md" }} color="white">
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter justifyContent="center" flexDirection={{ base: "column", md: "row" }} gap={4}>
          <Button
            color="#DE3B40"
            border="1px solid #DE3B40"
            variant="outline"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
            width={{ base: "100%", md: "auto" }} // Full-width for mobile
            height="50px"
            _hover={{
              boxShadow: "0 0 10px #DE3B40",
              transform: "scale(1.05)",
            }}
            _active={{
              boxShadow: "0 0 15px #DE3B40",
              transform: "scale(0.95)",
            }}
            onClick={handleLogout}
            isLoading={isLoggingOut}
            fontSize={{ base: "sm", md: "md" }}
          >
            Logout
          </Button>
          <Button
           color="#fff"
           border="1px solid #fff"
           variant="outline"
           fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
           width={{ base: "100%", md: "auto" }} // Full-width for mobile
           height="50px"
           _hover={{
             boxShadow: "0 0 10px #fff",
             transform: "scale(1.05)",
           }}
           _active={{
             boxShadow: "0 0 15px #fff",
             transform: "scale(0.95)",
           }}
            onClick={onClose}
            fontSize={{ base: "sm", md: "md" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
