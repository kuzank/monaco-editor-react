import React, {Component} from 'react';
import './App.css';
import './common.css'
import {AdvancedTypescriptEditor} from "./components/AdvancedTypescriptEditor";

class App extends Component {
    render() {
        return (
            // <div style={{padding: 20}}>
            //     <table width="100%">
            //         <tr>
            //             <td>
            //                 <h1><a id="Simple">Simple TypeScript Editor</a></h1>
            //                 <SimpleTypescriptEditor/>
            //             </td>
            //             <td>
            //                 <h1><a id="Advanced">Advanced TypeScript Editor</a></h1>
            //                 <AdvancedTypescriptEditor/>
            //             </td>
            //         </tr>
            //     </table>
            // </div>
            <AdvancedTypescriptEditor/>
        );
    }
}

export default App;
