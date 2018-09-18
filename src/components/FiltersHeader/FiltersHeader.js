import React, { Component } from 'react';
import { Slider } from 'antd';
import { Menu, Dropdown, Icon, Button } from 'antd';
import Backend from './../../backend/Backend';
import './FiltersHeader.module.less';




class FiltersHeader extends Component {

    state = {
        sliderValue: [0, 70],
        clearFilterButtonDisabled: true
    };

    handleSlider = (value) => {
        this.setState({
            sliderValue: value,
            clearFilterButtonDisabled: false
        });
        this.props.handleSlider(value);
    };


    handleTypeSelection = (e) => {
        this.setState({ clearFilterButtonDisabled: false });
        this.props.handleType(e.key);
    };


    handleSizeSelection = (e) => {
        this.setState({ clearFilterButtonDisabled: false });
        this.props.handleSize(e.key);
    }

    handleRemoveFilters = () => {
        this.setState({
            sliderValue: [0, 70],
            clearFilterButtonDisabled: true
        });

        this.props.handleRemoveFilters();
    }

    render() {
        const typeMenuItems = Backend.filters.type.map(element => {
            return (
                <Menu.Item key={element} onClick={this.handleTypeSelection}>
                    <a href="#">{element}</a>
                </Menu.Item>
            );
        });

        const sizeMenuItems = Backend.filters.sizes.map(element => {
            let upperCase = element.toUpperCase();
            return (
                <Menu.Item key={element} onClick={this.handleSizeSelection}>
                    {upperCase}
                </Menu.Item>
            );
        });

        const typeMenu = (
            <Menu>
                {typeMenuItems}
            </Menu>
        );

        const sizeMenu = (
            <Menu>
                {sizeMenuItems}
            </Menu>
        );


        return (
            <div className="FiltersHeader">
                <div className="FiltersContainer">
                    <div className="PriceSliderFilterContainer">
                        <span>Price: </span>
                        <Slider
                            className="PriceSliderFilter"
                            range
                            defaultValue={[0, 70]}
                            value={this.state.sliderValue}
                            onChange={this.handleSlider}
                        />
                    </div>
                    <Dropdown
                        className="ProductTypeFilter"
                        overlay={typeMenu}
                        trigger={['click']}

                    >
                        <Button>
                            Type <Icon type="down" />
                        </Button>
                    </Dropdown>

                    <Dropdown className="ProductSizeFilter" overlay={sizeMenu} trigger={['click']}>
                        <Button>
                            Size <Icon type="down" />
                        </Button>
                    </Dropdown>
                    <Button
                        type="primary"
                        className="ProductRemoveFilterButton"
                        onClick={this.handleRemoveFilters}
                        disabled={this.state.clearFilterButtonDisabled}
                    ><Icon type="close" theme="outlined" /></Button>
                </div>
            </div >
        );
    }
}

export default FiltersHeader;