import * as React from "react";
import {
    TouchableOpacity
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

  export default function LeftComponent({ item, navigate }) {
    return (
        <TouchableOpacity onPress={() => navigate.openDrawer()}>
            <Ionicons name={'ios-menu'} size={32} color='white' />
        </TouchableOpacity>
    );
}