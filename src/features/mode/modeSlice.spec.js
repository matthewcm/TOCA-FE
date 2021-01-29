import mode, {setMode, setPreparations, summaryQuery, setCSV, selectModeQuery, selectCSV} from './modeSlice'

describe('mode reducer', () => {
    it('should handle initial state', () => {
        expect(mode(undefined, {}).mode).toEqual([])
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
            ).mode[0]
        ).toEqual('SUMMARY') })

    it('should handle SET_MODE to mode active ', () => {
        expect(
            mode(
                undefined,
                {
                    type: setMode.type,
                    payload: {
                        mode: 'SUMMARY'
                    }
                }
            ).modeActive
        ).toEqual(true) })

    it('should handle SET_PREPARATIONTS ', () => {
        expect(
            mode(
                undefined,
                {
                    type: setPreparations.type,
                    payload: {
                        headers: {
                            date: 'created_at',
                            author: 'auth',
                            content: 'conti'
                        },
                        stopwords: "hi, stop, well, if, a, says",
                    }
                }
            )
        ).toEqual({
            mode: [],
            headers: {
                date: 'created_at',
                author: 'auth',
                content: 'conti'
            },
            stopwords: "hi, stop, well, if, a, says",
            prepareActive: true
        }) })

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
        ).toEqual({active:true, mode:'SUMMARY', query:'walrus'}) })

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
                        csv: 'csv,possibly\nstart,here'
                    }
                }
            ).csv
        ).toEqual([['csv', 'possibly'], ['start', 'here']])

    })
    it ('should select mode, grab mode from redux store', () => {
        expect(selectModeQuery({mode:'SUMMARY'})).toEqual('SUMMARY')
    })
    it ('should select CSV, grab csv from redux store', () => {
        expect(selectCSV({mode:{csv:'csv, start\n start, here'}})).toEqual('csv possibly')
    })

    // it should allow for redux for DATASET
})