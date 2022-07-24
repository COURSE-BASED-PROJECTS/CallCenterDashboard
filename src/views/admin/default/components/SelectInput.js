import React from 'react';
import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
} from 'chakra-react-select';
import { useColorModeValue } from '@chakra-ui/system';

export default function SelectInput(props) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');

    return (
        <CreatableSelect
            selectedOptionStyle='check'
            isClearable
            placeholder={props.placeholder}
            size='lg'
            fontWeight={'bold'}
            fontSize='lg'
            // onChange={this.handleChange}
            // onInputChange={this.handleInputChange}
            options={props.options}
            formatCreateLabel={(value) => `+ Thêm mới ${value}`}
        ></CreatableSelect>
    );
}
