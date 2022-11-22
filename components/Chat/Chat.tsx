import { useEffect, useRef, useState } from 'react';
import { sampleOne } from '~/utils/main';
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
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { Message } from '~/models/app';
import { sampleMessageData } from '~/data/api';

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}
interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  messages: Message[];
};

function Chat({ messages }: Props) {
  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  // Messages
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  function handleMessage(event: React.FormEvent<MessageFormElement>) {
    event.preventDefault();

    const newMessage = {
      sender: 'Me',
      body: message,
    };

    const updatedMessages = [...messages, newMessage];
    setMessage('');
    setMessagesData(updatedMessages);

    const randomMessage = sampleOne(sampleMessageData.items);

    setTimeout(() => {
      setMessagesData([...updatedMessages, randomMessage]);
    }, 1000);
  }

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
            onSubmit={() => handleMessage}
            as="form"
            direction="column"
            width="100%"
            gap="6"
          >
            <Input
              id="messageInput"
              placeholder="Message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Flex direction="column" width="100%" gap="3">
              <Button type="submit">Send</Button>
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
