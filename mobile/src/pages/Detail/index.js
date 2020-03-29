import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as mailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail() {
	const navigation = useNavigation();
	const route = useRoute();
	
	const incident = route.params.incident;
	const message = `Ola ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(incident.value)}`;

	function navigateBack() {
		navigation.goBack();
	}

	function sendEmail() {
		mailComposer.composeAsync({
			subject: `Heroi do caso: ${incident.title}`,
			recipients: [incident.email],
			body: message
		})
	}

	function sendWhatsapp() {
		Linking.openURL(
			`whatsapp://send?phone=${incident.whatsapp}&text=${message}`
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#E82041" />
				</TouchableOpacity>
			</View>

			<ScrollView style={{ flex: 1 }} >
				<View style={styles.incident}>
					<Text style={[styles.incidentPropety, { marginTop: 0 }]}>ONG:</Text>
					<Text style={styles.incidentValue}>
						{ incident.name } de { incident.city }/{ incident.uf }
					</Text>
					
					<Text style={styles.incidentPropety}>CASO:</Text>
					<Text style={styles.incidentValue}>{ incident.description }</Text>

					<Text style={styles.incidentPropety}>VALOR:</Text>
					<Text style={styles.incidentValue}>
						{
							Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.value)
						}
						</Text>
				</View>

				<View style={styles.contactBox}>
					<Text style={styles.heroTitle}>Salve o dia!</Text>
					<Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
					<Text style={styles.heroDescription}>
						Entre em contato:	
					</Text>
					<View style={styles.actions} onPress={sendWhatsapp}>
						<TouchableOpacity style={styles.action}>
							<Text style={styles.actionText}>WhatsApp</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.action} onPress={sendEmail}>
							<Text style={styles.actionText}>E-mail</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView >
		</View>
	);
}
