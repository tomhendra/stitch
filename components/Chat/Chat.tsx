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
  Heading,
  Spacer,
  Text,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import type { Message } from '~/models/app';

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}

export interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  channelTitle: string;
  messages: Message[];
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onChange: (e: any) => any;
  onSubmit: (event: React.FormEvent<MessageFormElement>) => void;
};

function Chat(props: Props) {
  const {
    channelTitle,
    messages,
    message,
    isOpen,
    onClose,
    onChange,
    onSubmit,
  } = props;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Chat</Heading>
          <Text fontSize={'md'}>{channelTitle}</Text>
        </DrawerHeader>
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
            // TODO fix this later & use FormControl / FormLabel components
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
              <Button colorScheme="purple" type="submit">
                Send
              </Button>
              <Button variant="outline" onClick={onClose}>
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
