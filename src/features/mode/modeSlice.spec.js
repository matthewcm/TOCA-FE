import mode, {setMode, summaryQuery, setCSV, selectModeQuery, selectCSV} from './modeSlice'

describe('mode reducer', () => {
    it('should handle initial state', () => {
        expect(mode(undefined, {}).mode).toEqual('UNSET')
    })

    it('should handle SET_MODE ', () => {
        expect(
            mode(
                undefined,
                {
                    type: setMode.type,
                    payload: {
                        mode: 'SUMMARY'
                    }
                }
            ).mode
        ).toEqual('SUMMARY') })

    it('should handle SUMMARY_QUERY', () => {
        expect(
            mode(
                {mode: 'SUMMARY'},
                {
                    type: summaryQuery.type,
                    payload: {
                        search: 'r/animals',
                        query: 'walrus'
                    }
                }
            )
        ).toEqual({mode:'SUMMARY', search: 'r/animals', query:'walrus'}) })

    it('should not handle SUMMARY_QUERY if mode is not SUMMARY', () => {
        expect(
            mode(
                {mode: 'UNSET'},
                {
                    type: summaryQuery.type,
                    payload: {
                        search: 'r/animals',
                        query: 'walrus'
                    }
                }
            )
        ).not.toEqual({mode:'SUMMARY', search: 'r/animals', query:'walrus'}) })


    it ('should handle SET_CSV if mode is set', () => {
        expect(
            mode(
                {mode: 'SUMMARY'},
                {
                    type: setCSV.type,
                    payload:{
                        csv: 'csv possibly'
                    }
                }
            ).csv
        ).toEqual('csv possibly')

    })
    it ('should handle url SET_CSV if mode is set', () => {
        expect(
            mode(
                {mode: 'SUMMARY'},
                {
                    type: setCSV.type,
                    payload:{
                        csv: 'csv possibly',
                        url: true
                    }
                }
            ).url
        ).toEqual(true)

    })
    it ('should select mode, grab mode from redux store', () => {
        expect(selectModeQuery({mode:'SUMMARY'})).toEqual('SUMMARY')
    })
    it ('should select CSV, grab csv from redux store', () => {
        expect(selectCSV({csv:'csv possibly'})).toEqual('csv possibly')
    })

    // it should allow for redux for DATASET
})