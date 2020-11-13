import React, { Component } from 'react';
import PropTypes from 'prop-types';
import County from './County';
import District from './District';
import ZipCode from './ZipCode';
import zipData from '../utils/ZipData';
import { findDeep } from '../utils/utils';

export default class TWzipcodeApp extends Component {
    constructor(props) {
        super(props);
        const { countyValue, districtValue, zipcodeValue } = this.props;
        console.log(this.props);
        const counties = Object.keys(zipData);
        let district;
        let county;
        let zipcode = '';
        let districts;

        if (countyValue === '') {
            county = countyValue;
            district = '';
        } else {
            let county = countyValue === '' ? counties[0] : countyValue;
            districts = Object.keys(zipData[county]).map((d) => d, []);
            if (districts.indexOf(districtValue) > -1) {
                district = districtValue;
            } else {
                district = districts[0];
            }

            zipcode = zipData[county][district];
        }

        //const county =
        // if (districtValue === '') {
        //     district = '';
        // } else if (districts.indexOf(districtValue) > -1) {
        //     district = districtValue;
        // } else {
        //     district = districts[0];
        // }
        // zipcode = zipData[county][district];

        this.state = {
            counties,
            county,
            districts,
            district,
            zipcode,
            zipcodePlaceholder: '',
        };

        if (zipcodeValue !== '') {
            this.changeZipcode.call(this, zipcodeValue);
        }
    }

    static propTypes = {
        countyFieldName: PropTypes.string,
        countyValue: PropTypes.object,
        css: PropTypes.arrayOf(PropTypes.string),
        detect: PropTypes.bool,
        districtFieldName: PropTypes.string,
        districtValue: PropTypes.string,
        googleMapsKey: PropTypes.string,
        handleChangeCounty: PropTypes.func,
        handleChangeDistrict: PropTypes.func,
        handleChangeZipcode: PropTypes.func,
        zipcodeFieldName: PropTypes.string,
        zipcodeValue: PropTypes.string,
        zipcodePlaceholder: PropTypes.string,
    };

    static defaultProps = {
        countyFieldName: 'county',
        countyValue: '',
        css: ['county-sel', 'district-sel', 'zipcode'],
        detect: false,
        districtFieldName: 'district',
        districtValue: '',
        googleMapsKey: '',
        handleChangeCounty: undefined,
        handleChangeDistrict: undefined,
        handleChangeZipcode: undefined,
        zipcodeFieldName: 'zipcode',
        zipcodeValue: '',
        zipcodePlaceholder: '郵遞區號',
    };
    static getDerivedStateFromProps(nextProps) {
        /** componentWillReceiveProps has been renamed, and is not recommended for use*/
        if (
            nextProps.countyValue &&
            nextProps.countyValue !== this.props.countyValue
        ) {
            this.changeCounty.call(this, nextProps.countyValue);
        }

        if (
            nextProps.districtValue &&
            nextProps.districtValue !== this.props.districtValue
        ) {
            this.changeDistrict.call(this, nextProps.districtValue);
        }

        if (
            nextProps.zipcodeValue &&
            nextProps.zipcodeValue !== this.props.zipcodeValue
        ) {
            this.changeZipcode.call(this, nextProps.zipcodeValue);
        }
        return null;
    }

    changeCounty = (county) => {
        console.log(county);
        const districts = Object.keys(zipData[county.value]).map((d) => d, []);
        console.log(districts);
        const { handleChangeCounty } = this.props;

        this.setState(
            {
                county,
                district: districts[0],
                zipcode: zipData[county.value][districts[0]],
                districts,
            },
            () => {
                if (typeof handleChangeCounty === 'function') {
                    handleChangeCounty({
                        county: this.state.county,
                        district: this.state.district,
                        zipcode: this.state.zipcode,
                    });
                }
            }
        );
    };

    changeDistrict = (district) => {
        console.log(district);
        console.log(this.state.county);
        const zipcode = zipData[this.state.county.value][[district.value][0]];
        const { handleChangeDistrict } = this.props;

        this.setState(
            {
                district,
                zipcode,
            },
            () => {
                if (typeof handleChangeDistrict === 'function') {
                    handleChangeDistrict({
                        county: this.state.county,
                        district: this.state.district.value,
                        zipcode: this.state.zipcode,
                    });
                }
            }
        );
    };

    changeZipcode = (zipcode) => {
        if (zipcode && zipcode.length === 3) {
            const { county, district } = findDeep(zipData, zipcode);
            const { handleChangeZipcode } = this.props;
            console.log(county);
            console.log(district);

            if (county && district && zipcode) {
                this.setState(
                    {
                        districts: Object.keys(zipData[county]),
                        county,
                        district,
                        zipcode,
                    },
                    () => {
                        if (typeof handleChangeZipcode === 'function') {
                            handleChangeZipcode({
                                county: this.state.county,
                                district: this.state.district,
                                zipcode: this.state.zipcode,
                            });
                        }
                    }
                );
            }
        } else {
            this.setState({
                zipcode,
            });
        }
    };

    render() {
        const {
            countyFieldName,
            districtFieldName,
            zipcodeFieldName,
            zipcodePlaceholder,
            css,
        } = this.props;
        const { counties, county, districts, district, zipcode } = this.state;

        return (
            <>
                <County
                    fieldName={countyFieldName}
                    className={css[0]}
                    data={counties}
                    value={county}
                    changeCounty={this.changeCounty}
                />
                <District
                    fieldName={districtFieldName}
                    className={css[1]}
                    data={districts}
                    value={district}
                    changeDistrict={this.changeDistrict}
                />
                <ZipCode
                    name={zipcodeFieldName}
                    className={css[2]}
                    value={zipcode}
                    placeholder={zipcodePlaceholder}
                    changeZipcode={this.changeZipcode}
                />
            </>
        );
    }
}
