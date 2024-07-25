import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    margin: 0,
    alignItems: "center",
  },
  w40: {
    width: "40%",
  },
  w20: {
    width: "20%",
  },
});

type QuotationProps = {
  name?: string;
  amount?: number;
  date?: string;
  items?: {
    name: string;
    quantity: number;
    amount: number;
  }[];
};

function capFirst(input: string) {
  return input[0].toUpperCase() + input.slice(1);
}

const Quotation = ({ props }: { props: QuotationProps }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontWeight: 900, fontSize: 24 }}>
            {props.name ? capFirst(props.name) : "Quotation"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Items</Text>
          <View style={styles.tableRow}>
            <Text style={styles.w40}>Item Description</Text>
            <Text style={styles.w40}>Quantity</Text>
            <Text style={styles.w20}>Unit Price</Text>
          </View>
          {props.items?.map((item) => {
            return (
              <View style={styles.tableRow}>
                <Text style={styles.w40}>{item.name}</Text>
                <Text style={styles.w40}>{item.quantity}</Text>
                <Text style={styles.w20}>{item.amount}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.section}>
          <Text>Total Amount: {props.amount?.toString()}</Text>
          <Text>Generated: {props.date || moment().format("YYYY/MM/DD")}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Quotation;
