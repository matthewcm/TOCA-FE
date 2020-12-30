import mode, {setMode, summaryQuery} from './modeSlice'

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
})