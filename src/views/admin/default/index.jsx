import { Flex, SimpleGrid } from '@chakra-ui/react';
import SockJsClient from 'react-stomp';

import CallInfo from './components/CallInfo';

export default function UserReports() {
    return (
        <Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <SimpleGrid width={'75%'}>
                <CallInfo />
            </SimpleGrid>

            {/* <SockJsClient
                url='http://localhost:8080/ws'
                topics={['/topic/public']}
                onMessage={(msg) => {
                    console.log(msg);
                }}
            /> */}
        </Flex>
    );
}
