import React from 'react';
import Select from 'react-select';
import './Filters.scss';

/*
 * FIND A BETTER WAY TO DO THIS STYLING SHIT USING GLOBAL SASS VARIABLES
 */

const filterStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        backgroundColor: 'none',
        '&:hover': {
            backgroundColor: '#dbe5f2'
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: '#f4f4f4',
        border: 0,
        boxShadow: '0 5px 8px #1a212950',
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#e1e5eb',
        borderWidth: '2px',
        borderColor: state.isFocused ? '#177bf2' : '#e1e5eb',
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#177bf2' : '#c5d1e5'
        }
    }),
    group: (provided, state) => ({
        ...provided,
        backgroundColor: '#177bf2',
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        fontWeight: 500
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#1a2129',
        '&:hover': {
            color: '#1a2129'
        }
    }),
    indicatorSeparator: (provided, state) => ({
        display: 'none'
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#1a2129',
        color: '#f4f4f4'
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        color: '#f4f4f4'
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: '#1a2129',
        '&:hover': {
            backgroundColor: '#1a2129',
            color: '#f85c56'
        }
    })
}

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.placeholder = props.placeholder;
        this.options = [];
        if (props.data) {
            props.data.map((lab, i) => {
                this.options.push({value: i, label: lab});
                return lab;
            })
        }
    }

    handleChange(selectedOptions) {
        this.props.onChange(selectedOptions.map(opt => opt.label));
    }

    createOptions() {
        var options = [];
        this.options.map((lab, i) => {
            var option = {value: i, label: lab}
            options.push(option);
            return lab;
        })
        return options;
    }

    render() {
        return (
            <Select styles={filterStyles} placeholder={this.placeholder} onChange={this.handleChange} options={this.options} isMulti/>
        );
    }
}

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.divisions = [1, 2, 3];
        this.classes = {
            'FR': 1,
            'SO': 2,
            'JR': 3,
            'SR': 4,
            'GR': 5
        };
        this.positions = ['QB', 'WR', 'OL', 'RB', 'TE', 'C', 'OT', 'FB', 'DL', 'DT', 'DE', 'LB', 'DB', 'CB', 'S', 'P', 'K', 'LS'];

        this.state = {
            selectedDivisions: [],
            selectedClasses: [],
            selectedPositions: [],
        }
        this.handleFilterChange  = this.handleFilterChange.bind(this);
    }

    handleFilterChange() {
        this.props.handleFilterChange(
            {
                'division': this.state.selectedDivisions.join(','),
                'class': this.state.selectedClasses.map((c) => {return this.classes[c]}).join(','),
                'position': this.state.selectedPositions.join(','),
            }
        );
    }

    render() {
        return (
        <div className="filters">
            <div className="filter-headers">
                <Dropdown
                    placeholder='Division'
                    onChange={
                        (selectedDivisions) => {
                            this.setState({selectedDivisions: selectedDivisions}, () => {
                                this.handleFilterChange();
                            });
                        }
                    }
                    data={this.divisions}
                />
            </div>
            <div className="filter-headers">
                <Dropdown
                    placeholder='Class'
                    onChange={
                        (selectedClasses) => {
                            this.setState({selectedClasses: selectedClasses}, () => {
                                this.handleFilterChange();
                            });
                        }
                    }
                    data={Object.keys(this.classes)}
                />
            </div>
            <div className="filter-headers">
                <Dropdown
                    placeholder='Position'
                    onChange={
                        (selectedPositions) => {
                            this.setState({selectedPositions: selectedPositions}, () => {
                                this.handleFilterChange();
                            });
                        }
                    }
                    data={this.positions}
                />
            </div>
        </div>
        );
    }
}
