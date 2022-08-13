import {
    Box,
    Button,
    Flex,
    Grid,
    Link,
    SimpleGrid,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import Banner from 'components/card/Mastercard';
import React, { useState } from 'react';
import Card from 'components/card/Card';
import GoongMaps from 'components/goongmaps/GoongMaps';
import TripsTable from './components/TripsTable';
import { columnsTripsTable } from './variables/columnsData';
import tableDataTrips from 'views/admin/gps/variables/tableDataTrips.json';

export default function GPSCoordinates() {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const textColorBrand = useColorModeValue('brand.500', 'white');
    return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Grid
                mb='20px'
                gridTemplateColumns={{
                    xl: 'repeat(3, 1fr)',
                    '2xl': '1fr 0.46fr',
                }}
                gap={{ base: '20px', xl: '20px' }}
                display={{ base: 'block', xl: 'grid' }}
            >
                <Flex
                    flexDirection='column'
                    gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
                >
                    <Card p='0px'>
                        <SimpleGrid>
                            {/* <Text
                                color={textColor}
                                fontSize='2xl'
                                ms='24px'
                                fontWeight='700'
                            >
                                Danh sách đặt xe
                            </Text> */}
                            <TripsTable
                                columnsData={columnsTripsTable}
                                tableData={tableDataTrips}
                            />
                        </SimpleGrid>
                    </Card>

                    <Flex direction='column'>
                        <Flex
                            mt='45px'
                            mb='20px'
                            justifyContent='space-between'
                            direction={{ base: 'column', md: 'row' }}
                            align={{ base: 'start', md: 'center' }}
                        >
                            <Text
                                color={textColor}
                                fontSize='2xl'
                                ms='24px'
                                fontWeight='700'
                            >
                                Định vị GPS
                            </Text>
                        </Flex>
                        <Card p='0px'>
                            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
                                <GoongMaps />
                            </SimpleGrid>
                        </Card>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection='column'
                    gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
                >
                    <Card p='0px'>
                        <Flex
                            align={{ sm: 'flex-start', lg: 'center' }}
                            justify='space-between'
                            w='100%'
                            px='22px'
                            py='18px'
                        >
                            <Text
                                color={textColor}
                                fontSize='xl'
                                fontWeight='600'
                            >
                                HERE IS list of trips
                            </Text>
                            <Button variant='action'>See all</Button>
                        </Flex>
                    </Card>
                </Flex>
            </Grid>
        </Box>
    );
}
