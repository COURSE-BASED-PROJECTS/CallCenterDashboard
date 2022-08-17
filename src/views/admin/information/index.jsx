import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import CallInfo from './components/CallInfo';
import Card from 'components/card/Card.js';
import TableTopCreators from 'views/admin/information/components/TableTopCreators';

import tableDataTopCreators from 'views/admin/information/variables/tableDataTopCreators.json';
import { tableColumnsTopCreators } from 'views/admin/information/variables/tableColumnsTopCreators';

import { useDispatch, useSelector } from 'react-redux';
import { selectStatusFetchRequests } from 'store/slices/requestsSlice';
import { selectRequests } from 'store/slices/requestsSlice';
import { selectErrorFetchRequests } from 'store/slices/requestsSlice';
import { fetchRequests } from 'store/slices/requestsSlice';

export default function UserReports() {
    const dispatch = useDispatch();
    const statusFetchRequests = useSelector(selectStatusFetchRequests);
    const requests = useSelector(selectRequests);
    const errorFetchRequests = useSelector(selectErrorFetchRequests);
    const [listAddress, setListAddress] = useState(null);

    useEffect(() => {
        console.log(statusFetchRequests);
        if (statusFetchRequests === 'idle') {
            dispatch(fetchRequests());
        }
        // if (requests) {
        //     setListAddress(
        //         requests.map((req) => {
        //             return { label: req.pickingAddress, value: req.pickingAddress };
        //         })
        //     );
        //     console.log(listAddress)
        // }
    }, [statusFetchRequests, dispatch, requests]);

    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex>
                <Card w='75%' px='0px' mr='20px'>
                    <CallInfo {...listAddress} />
                </Card>
                <Card w='25%'>
                    <TableTopCreators tableData={tableDataTopCreators} columnsData={tableColumnsTopCreators} />
                </Card>
            </Flex>
        </Box>
    );
}
