import {createSlice} from '@reduxjs/toolkit'
import {readString} from "react-papaparse";

// NEED CONSTS FOR MODE

const stateForTesting = {
    mode: [
        'lda'
    ],
    modeActive: true,
    headers: {
        date: 'created_utc',
        author: 'author',
        content: 'text'
    },
    csv: [
        [
            'created_utc',
            'author',
            'text'
        ],
        [
            '2021-01-16',
            '[deleted]',
            '[removed]'
        ],
        [
            '2021-01-16',
            '[deleted]',
            '[removed]'
        ],
        [
            '2021-01-16',
            '[deleted]',
            '[removed]'
        ],
        [
            '2021-01-15',
            'EinNudelsalat',
            'For the files UTinyRipper, for the code dnSpy'
        ],
        [
            '2021-01-15',
            'CoffinRehersal',
            'Do you really think anyone is going to take the time to help you when the most effort you\'re willing to put in is saying "IDK how"?\n\nSo for starters, what have you done so far?'
        ],
        [
            '2021-01-14',
            'paximidag',
            'Well, personally I would start with ghidra, and check how it sends/receives data. since it is multi platform it would probably use bcrypt.dll to encrypt/decrypt data. this would also let you compare versions to see if chunks have been removed (provided you have old client.exes)\n\nthen i would use http://www.rohitab.com/apimonitor and see if i can either extract the encryption key, or failing that/skipping that monitoring the encrypt/decrypt data, before the client sends it. (you will have to change the settings to save all 4096bytes rather than the default 2500 api montior saves.)\n\nthis should give you the main menu/character loading, and will give you some idea of the match making protocol.\n\nafter that... it depends hugely on the game. some are like marvel, where the clients get matchmaked together and the client can be an authority.'
        ],
        [
            '2021-01-14',
            'kemenaran',
            'That would be:\n\n- PRET Discord: https://discord.gg/d5dubZ3\n- n64decomp Discord: https://discord.gg/DuYH3Fh\n- LADX disassembling Discord: https://discord.gg/sSHrwdB'
        ],
        [
            '2021-01-14',
            'VoltorbsBane',
            'The campaigns to the more recent expansions basically, and the pvp, gambit, there\'s still stuff to do, but a lot less. If I were wanting to try do this myself, could you recommend some places to start, explaining like I\'m five?'
        ],
        [
            '2021-01-14',
            'paximidag',
            '..... fukkin what?\n\nthe *campaign* is gone?\n\n.... what... is the story now?\n\ni see why you want this fixed...\n\nwill have to re-install when i have time and see what i can do via packets...'
        ],
        [
            '2021-01-14',
            'VoltorbsBane',
            'The core gameplay is still fantastic but seriously, they removed almost \\*all\\* the raids, like four planets, a bunch of replayable horde mode style content... it\'s a lot. They even removed the original campaign to the game, there\'s no more red war at all. Hopefully it\'s all brought back at some point.'
        ],
        [
            '2021-01-14',
            'paximidag',
            'well darn. I did enjoy the game, I just got caught up with work, and didn\'t buy one of the DLCs as I didn\'t have time to play...\n\nTo find out it wont be the same even without the DLCs... is disappointing'
        ],
        [
            '2021-01-13',
            'VoltorbsBane',
            'Yeah they removed the majority of the game basically, still unsure if it\'s a hard push to get free to play players to buy the "expansion" or they basically want to build Destiny 3 in Destiny 2 and just removed too much too quickly.'
        ],
        [
            '2021-01-13',
            'inline_asmurai',
            '100% agree.'
        ],
        [
            '2021-01-13',
            'CptAlexx',
            'Il2cpp dumper will give you precise names for classes and their variables, other than that there\'s not much code to get if the game uses il2cpp.'
        ],
        [
            '2021-01-13',
            'EinNudelsalat',
            'thank you &lt;3'
        ],
        [
            '2021-01-13',
            'EinNudelsalat',
            'thank you &lt;3'
        ],
        [
            '2021-01-13',
            'EinNudelsalat',
            'Im trying to look up the source code, to exactly know whats going on, especially with the ghosts, so i can dodge all of their traits and specialties'
        ],
        [
            '2021-01-13',
            'CptAlexx',
            'Out of curiosity, what are you trying to achieve?\n\nIf it\'s a il2cpp compiled game, you can use a il2cpp dumper, and supply it with the il2cpp metadata file and a binary you\'d like to dump, GameAssembly.dll would be one. With this you are able to dump game specific classes and their offsets.\n\nYou could also make an empty unity game with the same unity version as your RE target, and use the symbols from that to find other Unity related classes/objects.'
        ],
        [
            '2021-01-13',
            'ZambeezH1',
            'yeah, any help at all will help us tremendously so let us know :)'
        ],
        [
            '2021-01-13',
            'Cr4nkSt4r',
            'But you can\'t mod this file and be able to load these changes into the game. Either choose a C++ scaffolding project from Il2cppInspector or something like a Mod for MelonLoader.\nGuides which state to easily make changes to the Assembly-CSharp.dll are outdated since the game updated to use Il2cpp.'
        ],
        [
            '2021-01-13',
            'pasterp',
            'The tool is [https://github.com/Perfare/Il2CppDumper](https://github.com/Perfare/Il2CppDumper)  \nBut I\'m not sure it uses il2cpp, you have to check by yourself (i think there is a folder/file named il2cpp ?), I guess if you have no assembly it does because it one of the most popular option for Unity games.'
        ],
        [
            '2021-01-13',
            'EinNudelsalat',
            'Can you explain to me how to do so?'
        ],
        [
            '2021-01-13',
            'pasterp',
            'Isn\'t that game uses il2cpp ? You will have to dump it before accessing the assembly.'
        ],
        [
            '2021-01-13',
            'pasterp',
            'Okay that is a good start !\nI do not have time this month but I will save it for later ! I hope you find help before at least !'
        ],
        [
            '2021-01-13',
            'ZambeezH1',
            'Yes we have a lot actually were having trouble getting all the packets that the client sends to the server and were missing some things. You can get more clarification if you join the discord via H1emu link and we have a server that runs the zone and we can get fully inGame and walk around and thats it pretty much'
        ],
        [
            '2021-01-13',
            'pasterp',
            'At what point are you stuck ?  \nDo you have something ?'
        ],
        [
            '2021-01-13',
            'SmallerBork',
            'Do you have links to these?'
        ],
        [
            '2021-01-12',
            'PhoenicianPirate',
            'So much to learn. So little time. Too many interests!'
        ],
        [
            '2021-01-12',
            'kemenaran',
            'Most of the disassembling communities I know gather around Discord servers.\n\nThe biggest one may be the folks on the PRET Discord; they originally focused on disassembling Pokmon games. Now that its mostly done, people still discuss about disassembling other games, or decompiling N64 games (on the n64decomp Discord).\n\nDiscords of homebrew communities (NES dev, GB dev, etc) are also related to people doing ROM hacking.\n\nOh, and on the LADX-Disassembly Discord, user Daid documents his attempts to reverse-engineer Final Fantasy Adventure on the Game Boy.'
        ],
        [
            '2021-01-12',
            'kerohazel',
            'Are there any communities devoted to game disassembly? Years back I started to disassemble Final Fantasy for the NES, but as a solo project it was just taking too long. With some help I\'d love to attempt it again. Not FF1 specifically, as others have already done that, but other games.'
        ],
        [
            '2021-01-12',
            'inline_asmurai',
            'Definitely brush up on your X86 knowledge, especially when it comes to segments and offsets in relation to memory addressing.  You\'ll likely need to familiarize yourself with how DOS extenders work.  Grab the free version of IDA Pro (5.5 I think) that still supports MZ analysis.  Get a copy of DOSBox with the built-in debugger.  DOSBoxX is supposed to have better debugging than the regular flavor but I haven\'t tried it.\n\nWith IDA you do static analysis and annotation.  With DOSBox you do dynamic run-time analysis.\n\nOther things that helped were to get a copy of the OpenWatcom source code (which many DOS games were compiled with) and try and do standard library function matching with the c library it provides.\n\nMSDOS reversing is definitely a slog but with enough time and patience it can be done.'
        ],
        [
            '2021-01-12',
            'mattbrah',
            'Fascinating stuff. I love seeing communities come together around disassembly projects like this.'
        ],
        [
            '2021-01-12',
            'QuickbuyingGf',
            'Don\'t just rely on uni modules, but also learn for yourself. Still much of creating hacks/bots is programming. Of course you need may need experience/knowledge on how to get the api/reverse it, but in the end you probably also want to write something that uses it.'
        ],
    ],
    csvActive: true,
    stopwords: 'as, a',
    prepareActive: true
}

const modeSlice = createSlice({
    name: 'mode',
    initialState: stateForTesting,
    // initialState: {mode:[]},
    reducers: {
        setMode(state, action) {
            if (state.mode.length > 0){
                if (!state.mode.includes(action.payload.mode)){
                    state.mode.push(action.payload.mode)
                }
            }else{
                state.mode = [action.payload.mode]
            }
            if (state.modeActive !== true){
                state.modeActive= true
            }
        },
        summaryQuery(state, action) {
            if (state.mode === 'SUMMARY'){
                state.query = action.payload.query
                state.active = true
            }
        },
        setCSV(state, action) {
            state.csv = readString(action.payload.csv).data
            state.csvActive = true
        },
        setPreparations(state, action) {
            state.headers = action.payload.headers
            state.stopwords = action.payload.stopwords
            state.prepareActive = true
        }
    }
})

export const selectMode = state => state.mode.mode
export const selectModeQuery = state => state.mode
export const selectCSV = state => state.mode.csv

export const {setMode ,summaryQuery, setCSV, setPreparations} = modeSlice.actions
export default modeSlice.reducer