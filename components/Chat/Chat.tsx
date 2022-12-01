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
  Input,
  Spacer,
  Text,
} from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { sampleMessageData } from '~/data/api';
import type { Message } from '~/models/app';
import { sampleOne } from '~/utils';

interface FormElements extends HTMLFormControlsCollection {
  messageInput: HTMLInputElement;
}

export interface MessageFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  channelTitle: string;
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

function Chat({ isOpen, onClose, channelTitle, messages, setMessages }: Props) {
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent<MessageFormElement>) {
    e.preventDefault();

    if (!message) return;

    const newMessage = {
      sender: 'Me',
      body: message,
    };

    // clear the input value
    setMessage('');
    // update the messages array to include the new message
    setMessages([...messages, newMessage]);

    const randomMessage = sampleOne(sampleMessageData.items);
    // update the messages array after one second to include a random message
    setTimeout(() => {
      /* 
        Pass an _updater function_ to setMessages to be added to the queue. 
        This will calculate the state for the next render based on the previous 
        state change above: setMessages([...messages, newMessage]); 
      */
      setMessages(messages => [...messages, randomMessage]);
    }, 1000);
  }

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
                  <Text fontSize="xs">{message.sender}</Text>
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
            onSubmit={handleSubmit}
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
