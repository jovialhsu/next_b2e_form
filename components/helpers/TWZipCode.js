import React, { Component } from 'react'
import PropTypes from 'prop-types'
import County from './County'
import District from './District'
import ZipCode from './ZipCode'
import zipData from '../utils/ZipData'
import { findDeep } from '../utils/utils'

export default class TWzipcodeApp extends Component {
    constructor(props) {
        super(props)
        const { countyValue, districtValue, zipcodeValue } = this.props
        const counties = Object.keys(zipData) //縣市的陣列
        let district
        let county
        let zipcode = ''
        let districts

        if (countyValue === '') {
            county = ''
            district = '' //若未選擇縣市鄉鎮地區為空白
            districts = []
        } else {
            let county = countyValue === '' ? counties[0] : countyValue
            districts = Object.keys(zipData[county]).map(d => d, [])
            if (districts.indexOf(districtValue) > -1) {
                district = districtValue
            } else {
                district = districts[0]
            }
            zipcode = zipData[county][district]
        }

        this.state = {
            counties,
            county,
            districts,
            district,
            zipcode,
            zipcodePlaceholder: '',
        }

        if (zipcodeValue !== '') {
            this.changeZipcode.call(this, zipcodeValue)
        }
    }

    static propTypes = {
        countyFieldName: PropTypes.string,
        countyValue: PropTypes.string,
        css: PropTypes.arrayOf(PropTypes.string),
        detect: PropTypes.bool,
        districtFieldName: PropTypes.string,
        districtValue: PropTypes.string,
        handleChangeCounty: PropTypes.func,
        zipcodeFieldName: PropTypes.string,
        zipcodeValue: PropTypes.string,
        zipcodePlaceholder: PropTypes.string,
    }

    static defaultProps = {
        countyFieldName: 'county',
        countyValue: '',
        css: ['county-sel', 'district-sel', 'zipcode'],
        detect: false,
        districtFieldName: 'district',
        districtValue: '',
        handleChangeCounty: undefined,
        zipcodeFieldName: 'zipcode',
        zipcodeValue: '',
        zipcodePlaceholder: '郵遞區號',
    }
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.countyValue && nextProps.countyValue !== this.props.countyValue) {
            this.changeCounty.call(this, nextProps.countyValue)
        }

        if (nextProps.districtValue && nextProps.districtValue !== this.props.districtValue) {
            this.changeDistrict.call(this, nextProps.districtValue)
        }

        if (nextProps.zipcodeValue && nextProps.zipcodeValue !== this.props.zipcodeValue) {
            this.changeZipcode.call(this, nextProps.zipcodeValue)
        }
        return null
    }
    componentDidMount = () => {
        document.addEventListener(
            'click',
            () => {
                this.changeCounty
                this.changeDistrict
                this.changeZipcode
            },
            true
        )
    }

    componentWillUnmount = () => {
        document.removeEventListener(
            'click',
            () => {
                this.changeCounty
                this.changeDistrict
                this.changeZipcode
            },
            true
        )
    }
    changeCounty = county => {
        const districts = Object.keys(zipData[county]).map(d => d, [])
        const { handleChangeCounty } = this.props

        this.setState(
            {
                county,
                district: districts[0],
                zipcode: zipData[county][districts[0]],
                districts,
            },
            () => {
                if (typeof handleChangeCounty === 'function') {
                    handleChangeCounty({
                        addrContCounty: this.state.county,
                        addrContDistrict: this.state.district,
                        zipCont: this.state.zipcode,
                    })
                }
            }
        )
    }

    changeDistrict = district => {
        const zipcode = zipData[this.state.county][[district][0]]
        const { handleChangeCounty } = this.props

        this.setState(
            {
                district,
                zipcode,
            },

            () => {
                if (typeof handleChangeCounty === 'function') {
                    handleChangeCounty({
                        addrContCounty: this.state.county,
                        addrContDistrict: this.state.district,
                        zipCont: this.state.zipcode,
                    })
                }
            }
        )
    }

    changeZipcode = zipcode => {
        if (zipcode && zipcode.length === 3) {
            const { county, district } = findDeep(zipData, zipcode)
            const { handleChangeCounty } = this.props

            if (county && district && zipcode) {
                this.setState(
                    {
                        districts: Object.keys(zipData[county]),
                        county,
                        district,
                        zipcode,
                    },
                    () => {
                        if (typeof handleChangeCounty === 'function') {
                            handleChangeCounty({
                                addrContCounty: this.state.county,
                                addrContDistrict: this.state.district,
                                zipCont: this.state.zipcode,
                            })
                        }
                    }
                )
            }
        } else {
            this.setState({
                zipcode,
            })
            this.props.onChange({ name: 'zipCont', value: zipcode })
        }
    }

    render() {
        const { countyFieldName, districtFieldName, zipcodeFieldName, zipcodePlaceholder, css } = this.props
        const { counties, districts } = this.state
        return (
            <>
                <County
                    fieldName={countyFieldName}
                    className={css[0]}
                    data={counties}
                    value={this.props.value[0]}
                    changeCounty={this.changeCounty}
                    name={this.props.name[0]}
                    onChange={this.props.onChange}
                />
                <District
                    fieldName={districtFieldName}
                    className={css[1]}
                    data={districts}
                    value={this.props.value[1]}
                    name={this.props.name[1]}
                    changeDistrict={this.changeDistrict}
                    onChange={this.props.onChange}
                />
                <ZipCode
                    name={zipcodeFieldName}
                    className={css[2]}
                    value={this.props.value[2]}
                    name={this.props.name[2]}
                    placeholder={zipcodePlaceholder}
                    changeZipcode={this.changeZipcode}
                />
            </>
        )
    }
}
