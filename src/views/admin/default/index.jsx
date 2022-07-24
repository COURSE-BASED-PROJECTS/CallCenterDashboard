import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import CallInfo from './components/CallInfo';

export default function UserReports() {
    return (
        <Flex pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <SimpleGrid width={'75%'}>
                <CallInfo />
            </SimpleGrid>
            <SimpleGrid ml={'1%'} width={'25%'}>
                <WeeklyRevenue />
            </SimpleGrid>
        </Flex>
    );
}
