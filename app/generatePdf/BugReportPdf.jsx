'use client';

import { Page, StyleSheet, View, Document, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 40,
        color: '#000000',
        fontWeight: 'bold',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
        color: '#000000',
    },
    text: {
        color: '#000000',
    }
});

const BugReportPdf = ({ report }) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <Text style={styles.title}>Code Doctor - Bug Report</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.text}>{report?.title || 'N/A'}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Steps to Reproduce:</Text>
                <Text style={styles.text}>{report?.steps || 'N/A'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Expected Behavior:</Text>
                <Text style={styles.text}>{report?.expBehavior || 'N/A'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Actual Behavior:</Text>
                <Text style={styles.text}>{report?.actBehavior || 'N/A'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Environment Info:</Text>
                <Text style={styles.text}>{report?.envInfo || 'N/A'}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Severity:</Text>
                <Text style={styles.text}>{report?.severity || 'Not specified'}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Additional Notes or Suggestions:</Text>
                <Text style={styles.text}>{report?.additional || 'N/A'}</Text>
            </View>
        </Page>
    </Document>

)


export default BugReportPdf;
