import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react';
import type { Message } from '~/models/app';

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}
interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  messages: Message[];
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onChange: (e: any) => any;
  onSubmit: (event: React.FormEvent<MessageFormElement>) => void;
};

function Chat(props: Props) {
  const { messages, message, isOpen, onClose, onChange, onSubmit } = props;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Chat</DrawerHeader>
        <DrawerBody>
          <Flex direction="column" maxHeight="100%">
            <Box p="4">
              {messages?.map(message => (
                <div key={message.body}>
                  <Text fontSize="xs">From: {message.sender}</Text>
                  <Text marginBottom={6}>{message.body}</Text>
                </div>
              ))}
            </Box>
            <Spacer />
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Flex
            // TODO fix this later
            // @ts-ignore
            onSubmit={onSubmit}
            as="form"
            direction="column"
            width="100%"
            gap="6"
          >
            <Input
              id="messageInput"
              placeholder="Message..."
              value={message}
              onChange={onChange}
            />
            <Flex direction="column" width="100%" gap="3">
              <Button colorScheme="teal" type="submit">
                Send
              </Button>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export { Chat };
