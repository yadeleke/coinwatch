import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class RowTwoColumns extends Component {
	formatPercent(label, value){
		let style = {};
		if(label === 'Percent Change (Hour):' || label === 'Percent Change (Day):' || label === 'Percent Change (Week):'){    
			if(value.charAt(0) === '-'){
				style = {
					fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'sans-serif',
					fontSize: 15,
					minWidth: 170, 
					color: 'red'
				};
			} else if ((value.charAt(0) !== '-') && (value !== '0.00%')) {
				style = {
					fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'sans-serif',
					fontSize: 15,
					minWidth: 170, 
					color: 'green'
				};
			} else {
				style = {
					fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'sans-serif',
					fontSize: 15,
					minWidth: 170, 
				};
			}
		}
		return style;
	}

	render() {
		const {label, value} = this.props;
		return(
			<View style={styles.row}>
				<Text style={styles.label} numberOfLines={1}>{label}</Text>
				<Text style={this.formatPercent(label, value)} numberOfLines={1} >{value}</Text>
			</View>
		);
        
	}
}

const styles = StyleSheet.create({
	row: {
		backgroundColor: 'white',
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 20,
	},
	label: {
		fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'sans-serif',
		fontSize: 15,
		minWidth: 170,
	},
});