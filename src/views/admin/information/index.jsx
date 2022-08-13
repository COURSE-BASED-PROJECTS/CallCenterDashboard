import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import CallInfo from './components/CallInfo';
import Card from 'components/card/Card.js';
import TableTopCreators from 'views/admin/information/components/TableTopCreators';

import tableDataTopCreators from 'views/admin/information/variables/tableDataTopCreators.json';
import { tableColumnsTopCreators } from 'views/admin/information/variables/tableColumnsTopCreators';

export default function UserReports() {
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Flex>
                <Card w='75%' px='0px' mr='20px'>
                    <CallInfo />
                </Card>
                <Card w='25%'>
                    <TableTopCreators
                        tableData={tableDataTopCreators}
                        columnsData={tableColumnsTopCreators}
                    />
                </Card>
            </Flex>
        </Box>
    );
}
