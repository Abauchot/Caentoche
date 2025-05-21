import {ScrollView} from 'react-native';
import Dishes from './components/Dishes';
import Desserts from './components/Desserts';

export default function Menu() {
    
    return (
        <ScrollView>
            <Dishes />
            <Desserts/>
        </ScrollView>
    );
}