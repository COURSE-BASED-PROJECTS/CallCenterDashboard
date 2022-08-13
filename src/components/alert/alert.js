import React from 'react';
import './alert.css';
import {
    Button,
    ChakraProvider,
    extendTheme,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';

const theme = extendTheme({
    components: {
        Modal: {
            baseStyle: (props) => ({
                dialog: {
                    maxWidth: ['55%', '55%', '55%'],
                    minWidth: '55%',
                    bg: '#bef0c8',
                },
            }),
        },
    },
});

const Alert = (props) => {
    const { type, show, message, handleClose } = props;
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    );
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    return (
        <ChakraProvider theme={theme}>
            <Modal isCentered isOpen={show} onClose={handleClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Thông báo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{message}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleClose}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default Alert;
