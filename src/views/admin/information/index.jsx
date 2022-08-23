import { Box, Flex } from '@chakra-ui/react';

import CallInfo from './components/CallInfo';
import Card from 'components/card/Card.js';
import TopHailingTable from 'views/admin/information/components/TopHailingTable';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTravelInfomation } from 'store/slices/hailingSlice';
import { setStatusPackage } from 'store/slices/hailingSlice';

export default function RequestForm() {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch(setTravelInfomation(null));
            dispatch(setStatusPackage('Đang tiếp nhận thông tin...'));
        }, 4000);
    });
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex>
                <Card w='75%' px='0px' mr='20px'>
                    <CallInfo />
                </Card>
                <Card w='25%'>
                    <TopHailingTable />
                </Card>
            </Flex>
        </Box>
    );
}
