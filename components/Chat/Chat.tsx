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
import { useRef, useState } from 'react';
import { ArrowUpRight } from '~/components';
import { sampleMessageData } from '~/data/api';
import { getErrorMessage, sampleOne } from '~/utils';

import type { Message } from '~/models/app';

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
};

function Chat({ isOpen, onClose, channelTitle }: Props) {
  /* 
    messages use static data at present. in a real–world app they would be 
    fetched from a database and each message would have an associated channelId.
  */
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('typing');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
    status !== 'typing' && setStatus('typing');
  }

  function handleSubmit(e: React.FormEvent<MessageFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const newMessage = {
        sender: 'Me',
        body: message,
      };
      // clear the input value
      setMessage('');
      // update the messages array to include the new message
      setMessages([...messages, newMessage]);
      // update the messages array after one second to include a random message
      const randomMessage = sampleOne(sampleMessageData.items);
      setTimeout(() => {
        /* 
          Pass an *updater function* to setMessages to be added to the queue. 
          This will calculate the state for the next render based on the 
          previous state change above: setMessages([...messages, newMessage]); 
        */
        setMessages(messages => [...messages, randomMessage]);
      }, 1000);

      setStatus('success');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
      setStatus('typing');
    }
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
            // TODO fix this later & use FormControl / FormLabel components + https://zod.dev
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
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
            <Flex direction="column" width="100%" gap="3">
              <Button
                colorScheme="purple"
                type="submit"
                disabled={status === 'submitting' || !message.length}
              >
                Send
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {error !== null && <Text className="Error">{error}</Text>}
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type ChatToggleButtonProps = {
  onOpen: any;
};

function ChatToggleButton({ onOpen }: ChatToggleButtonProps) {
  const ref = useRef();
  return (
    <Button
      leftIcon={<ArrowUpRight h="24px" w="24px" />}
      // TODO fix this later
      // @ts-ignore
      ref={ref}
      onClick={onOpen}
      colorScheme="purple"
      size="md"
      variant="link"
      fontWeight="bold"
      p={4}
    >
      Chat
    </Button>
  );
}

export { Chat, ChatToggleButton };
