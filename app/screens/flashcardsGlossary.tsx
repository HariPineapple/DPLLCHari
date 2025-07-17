import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const DATA = [
  {
     code: "ABF",
     Meaning: "Account Based Forecasting, also known as Customer Planning or Customer Specific Forecasting (CSF), refers to a bottom up demand forecasting process which starts with customer retail forecast, then arrives at a customer shipment forecast to be aggregated into a supply chain forecast."
  },
  {
     code: "Abnormal Demand",
     Meaning: "Service loss category which has occurred because the sales order items or schedule lines are flagged as abnormal demand in SAP CRM.It shows that sales order quantity deviates from the normal quantities by an abnormal amount."
  },
  {
     code: "ACV",
     Meaning: "All Commodity Volume"
  },
  {
     code: "Ad hoc Pass",
     Meaning: "Exception oriented pass"
  },
  {
     code: "Aggregation",
     Meaning: "The principle under which all measures are combined to determine reporting status"
  },
  {
     code: "APICS",
     Meaning: "The Association for Operations Managementoffers certification in supply chain management and resource management. The two different certifications are titled CPIM and CIRM."
  },
  {
     code: "APO",
     Meaning: "Advanced Planner and Optimizer, the planning softwarefromSAPAG."
  },
  {
     code: "ATO",
     Meaning: "Assembled to Order"
  },
  {
     code: "ATP",
     Meaning: "Available to Promise"
  },
  {
     code: "Backorders",
     Meaning: "Sales document created whose order items cannot be confirmed due to lack of availability or material shortages."
  },
  {
     code: "Baseline",
     Meaning: "Demand for business as distinguished from incremental impact from events"
  },
  {
     code: "Bias",
     Meaning: "A set of results consistently above or below an established centerline that indicates the need for corrective action."
  },
  {
     code: "BOM",
     Meaning: "Bill of Materials"
  },
  {
     code: "Bucket Days",
     Meaning: "The number of workdays within a repetitive planning period."
  },
  {
     code: "Causal Models",
     Meaning: "A causal model is an abstract quantitative representation of real-world dynamics. Hence, a causal model attempts to describe the causal and other relationships, among a set of variables."
  },
  {
     code: "CBP",
     Meaning: "Consensus Business Planning"
  },
  {
     code: "CFPIM",
     Meaning: "Certified Fellow in Production and Inventory Management"
  },
  {
     code: "CIRM",
     Meaning: "Certififedin Integrated Resources Management"
  },
  {
     code: "CIRM",
     Meaning: "Certififedin Integrated Resources Management-CIRM is a comprehensive educational program designed to help you understand the power of collaboration among organizational resources such as product development, marketing/sales, human resources, finance, and operations."
  },
  {
     code: "Consensus",
     Meaning: "Generalagreeement"
  },
  {
     code: "Constrained Forecast",
     Meaning: "The result of production planning process that can be supplied in the short run to manage customer demands."
  },
  {
     code: "CPFR",
     Meaning: "Collaborative, Planning, Forecasting and Replenishment is a concept popularized and institutionalized by theVICSorganization to enable manufacturers and retailers to better collaborate on forecasting and promotional planning to achieve supply chain efficiencies."
  },
  {
     code: "CPG",
     Meaning: "Consumer Packaged Goods, refers to the manufacturers and supplies in the Packaged Goods industry, a very specific reference to companies that manufacture or distribute Consumer Packaged Goods to the retail environment."
  },
  {
     code: "CPIM",
     Meaning: "Certified in Production and Inventory Management, a certification offered by the APICS, the Association for Operations Management."
  },
  {
     code: "CRM",
     Meaning: "Customer Relationship Management; the process and discipline to analyze the trade funds, promotional planning and execution and evaluating the effectiveness of promotions. Oracle CRM, Siebel, and SAP CRM are the dominant players in this space. Siebel and Demantra have been acquired by Oracle."
  },
  {
     code: "CRP",
     Meaning: "Continuous Replenishment Program, another term to denote VMI or Vendor Managed Inventories, where the supplier or manufacturer monitors the inventory at the customer warehouse on a continuous basis and writes the orders on behalf of the customer to ensure warehouses are adequately stocked."
  },
  {
     code: "CSCP",
     Meaning: "Certified Supply-Chain Professional"
  },
  {
     code: "CTO",
     Meaning: "Configured to Order"
  },
  {
     code: "Cyclicality",
     Meaning: "Demand for each product following a life-cycle pattern, with launch, growth, leveling and finally declining pattern"
  },
  {
     code: "Dampening",
     Meaning: "make less strong or intense"
  },
  {
     code: "DC",
     Meaning: "Distribution Center"
  },
  {
     code: "DDSN",
     Meaning: "Demand Driven Supply Networks"
  },
  {
     code: "Demand Accruals",
     Meaning: "Short term liabilities which continually occur during an accounting period but are not supported by written demand for payment."
  },
  {
     code: "Demand Accuracy",
     Meaning: "The process of determining theaccuracyof forecasts made regarding customerdemand for a product."
  },
  {
     code: "Demand Management",
     Meaning: "Major function of the sales and operations planning process where weworkewith customers to adjust demand when there is shortage of inventory supply."
  },
  {
     code: "Demand Volatility",
     Meaning: "Deviation of demand from the average"
  },
  {
     code: "Dependent Demand",
     Meaning: "Demand for an item that is directly related to or derived from the demand for other items."
  },
  {
     code: "DP",
     Meaning: "Demand Planning, a functional and subject reference to the forecasting group and role"
  },
  {
     code: "DRP",
     Meaning: "Distribution Requirements Planning"
  },
  {
     code: "DTC",
     Meaning: "Direct To Channel"
  },
  {
     code: "Economic Forecasts",
     Meaning: "A prediction of the likely impact on the business environment of factors such as inflation, interest rates, unemployment, government and consumer spending, etc."
  },
  {
     code: "EDI",
     Meaning: "Electronic Data Interchange"
  },
  {
     code: "EOQ",
     Meaning: "Economic Order Quantity"
  },
  {
     code: "ETO",
     Meaning: "Engineered to Order"
  },
  {
     code: "Event Modeling",
     Meaning: "Process to model Promotional Events and other extreme events"
  },
  {
     code: "Ex-post Forecasting",
     Meaning: "Forecast of the history"
  },
  {
     code: "FAN",
     Meaning: "Flu Alert Network"
  },
  {
     code: "FG",
     Meaning: "Finished Goods"
  },
  {
     code: "FMCG",
     Meaning: "Fast Moving Consumer Goods"
  },
  {
     code: "Forecast Accuracy",
     Meaning: "Measure of how close the actuals are to the forecasted quantity"
  },
  {
     code: "Forecast Consumption",
     Meaning: "The process of subtracting demand generated by sales orders from forecasted demand thereby preventing demand being counted twice in the planning period."
  },
  {
     code: "Forecast Cycle",
     Meaning: "Frequency at which your demand plans are re-forecasted"
  },
  {
     code: "Forecast Error",
     Meaning: "The deviation of the actual from the forecasted quantity"
  },
  {
     code: "Forecast Horizon",
     Meaning: "Theforecast horizonis the length of time into the future for whichforecastsare to be prepared."
  },
  {
     code: "Forecast Inaccuracy",
     Meaning: "The difference between the actual value of a parameter and the value indicated by a forecast"
  },
  {
     code: "Forecast Pass",
     Meaning: "Systematic communication of forecast from demand planning to supply planning at the end of each forecast cycle"
  },
  {
     code: "Forecast Release",
     Meaning: "Systematic communication of forecast from demand planning to supply planning at the end of each forecast cycle- This is the same as the Forecast Pass"
  },
  {
     code: "FSI",
     Meaning: "Free Standing Insert , typically in the weekly or Sunday paper - this is part of CPG demand planning."
  },
  {
     code: "Gross Demand",
     Meaning: "Gross Demand is what was ordered or shipped in total.This does NOT adjust for returns."
  },
  {
     code: "IBM",
     Meaning: "Integrated Business Management"
  },
  {
     code: "IBP",
     Meaning: "Integrated Business Planning"
  },
  {
     code: "Independent Demand",
     Meaning: "Demand for an item unrelated to the demand for other items."
  },
  {
     code: "Intermittent Demand",
     Meaning: "Demand Events occur only sporadically. Often characterized by zero demand in many months followed by a positive demand point."
  },
  {
     code: "Inventory",
     Meaning: "Asset that is owned by a business that has the express purpose of being sold to a customer."
  },
  {
     code: "IO",
     Meaning: "Inventory Optimization"
  },
  {
     code: "JIT",
     Meaning: "Just In Time"
  },
  {
     code: "KPI",
     Meaning: "Key Performance Indicator"
  },
  {
     code: "LTL",
     Meaning: "Less thanTruck Load"
  },
  {
     code: "MAD",
     Meaning: "Mean Absolute Deviation, similar toMAPEbefore it becomes a percentage error. Academics respect this measure, largely due to confusion and mis-interpretations around theMAPE."
  },
  {
     code: "MAPE",
     Meaning: "Mean Absolute Percent Error is a cross-sectional measure to calculate the demand forecast error across products, customers, divisions etc."
  },
  {
     code: "Market Intelligence",
     Meaning: "Information relevant to a company's markets, gathered and analyzed specifically for the purpose of accurate and confident decision-making in determining strategy in areas such as marketopportunity,marketpenetration strategy, andmarket development."
  },
  {
     code: "Model",
     Meaning: "Mathematical representation that explains the relationship between different forces affecting demand"
  },
  {
     code: "Model Fit",
     Meaning: "How closely your model fits the historical data"
  },
  {
     code: "Moving Average",
     Meaning: "A succession of averages derived from successive segments (typically of constant size and overlapping) of a series of values."
  },
  {
     code: "MRP",
     Meaning: "Materials Requirements Planning"
  },
  {
     code: "MTD",
     Meaning: "Month to date"
  },
  {
     code: "MTG",
     Meaning: "Month to Go"
  },
  {
     code: "MTO",
     Meaning: "Made to Order, a type of production and inventory strategy that starts the manufacturing process only on receipt of the customer order. The manufacturer has the luxury of making the customer order, (and perhaps pay) and wait.Dellis a classic example of a MTO business model."
  },
  {
     code: "MTS",
     Meaning: "Made to Stock, a production and replenishment model that keeps inventory of products, anticipating customer orders."
  },
  {
     code: "Multivariate",
     Meaning: "Including multiple variable quantities"
  },
  {
     code: "Net Demand",
     Meaning: "Subtraction of returns from gross demand"
  },
  {
     code: "Noise",
     Meaning: "Informal, extraneous,irrelevant,orMeaninglessfacts,information or statistics."
  },
  {
     code: "OFS",
     Meaning: "Oil Field Services"
  },
  {
     code: "OLS",
     Meaning: "Ordinary Least Squares, the most basic methodology for model fitting by choosing the model that minimizes the residual error"
  },
  {
     code: "OTC",
     Meaning: "Over The Counter"
  },
  {
     code: "Outlier",
     Meaning: "An outlier is an extreme data observation that is not expected to repeat in the future"
  },
  {
     code: "PMAD",
     Meaning: "Percent MeanAbsolut"
  },
  {
     code: "POP",
     Meaning: "Point of Purchase"
  },
  {
     code: "POS",
     Meaning: "Point of Sale"
  },
  {
     code: "Processing lead time",
     Meaning: "The time required to procure or manufacture an item. For manufactured assemblies, processing lead time equals the manufacturing lead time."
  },
  {
     code: "Regression",
     Meaning: "The statistical process of predicting one or more continuous variables, such as profit or loss, based on other attributes in the dataset."
  },
  {
     code: "Replenishment",
     Meaning: "movement of inventory from upstream,or reserve, or product storage locations to downstream or primary storage, picking andshipmentlocations."
  },
  {
     code: "RMSE",
     Meaning: "Root Mean Squared Error, a measure of model diagnostic and with more application in inventory management to set parameters for safety stock calculations."
  },
  {
     code: "Robustness",
     Meaning: "Change of model given a small change of historical data"
  },
  {
     code: "Rough Cut Planner",
     Meaning: "The routine that automatically calculates required resources for rough cut capacity planning (done when running a report or inquiry)."
  },
  {
     code: "S&OP",
     Meaning: "Sales and Operations Planning"
  },
  {
     code: "Safety Stock",
     Meaning: "Quantity of stock planned to have in inventory to protect against fluctuations in demand and/or supply."
  },
  {
     code: "SCOR",
     Meaning: "Supply Chain Operations Reference Model"
  },
  {
     code: "Segmentation",
     Meaning: "A data mining technique that analyzes data to discover mutually exclusive collections of records that share similar attributes sets."
  },
  {
     code: "Service Levels",
     Meaning: "The extent to which a supplying resource satisfies customer requirements, often expressed in terms of error rate, resource availability or accuracy in meeting requested dates."
  },
  {
     code: "SIOP",
     Meaning: "Sales, Inventory and Operations Planning"
  },
  {
     code: "SKU",
     Meaning: "Stock Keeping Unit"
  },
  {
     code: "SKU Mix Error",
     Meaning: "Measurement of degree of error due to incorrect mix of products forecasted and produced"
  },
  {
     code: "SMI",
     Meaning: "Supplier Managed Inventory, very similar to VMI except here the manufacturer lets their inventories be managed by a supplier of key components and input products."
  },
  {
     code: "SNP",
     Meaning: "Supply Network Planning"
  },
  {
     code: "Source forecast",
     Meaning: "When loading a forecast into another forecast, the source forecast is the forecast you load from."
  },
  {
     code: "Standard Deviation",
     Meaning: "A computed measure ofvari- abilityindicating the spread of the data set around the mean."
  },
  {
     code: "Standard Error",
     Meaning: "the extent to which the mean obtained differs from the true mean of the population from which the sample was taken."
  },
  {
     code: "Statistical Forecast",
     Meaning: "Long term decisions and decisions that change the inherent structure of the business"
  },
  {
     code: "Statistical Model",
     Meaning: "Embodies a set of assumptions concerning the generation of the observed data, and similar data from a larger population"
  },
  {
     code: "Tactical Forecast",
     Meaning: "Short term and near term decisions that reflect needs and activities in existing structures and processes"
  },
  {
     code: "Time fence",
     Meaning: "A policy or guideline established to note where various restrictions or changes in operating procedures take place. The planning process cannot create or reschedule orders within the planning time fence."
  },
  {
     code: "Tolerance Band",
     Meaning: "Confidence band around the ex-post forecast"
  },
  {
     code: "Unconstrained Forecast",
     Meaning: "Forecasting of the customer needs in an unconstrained view"
  },
  {
     code: "Univariate",
     Meaning: "Including one variable quantity"
  },
  {
     code: "Utilization",
     Meaning: "Required capacity divided by available capacity."
  },
  {
     code: "VMI",
     Meaning: "Vendor Managed Inventories, where the supplier or manufacturer monitors the inventory at the customer warehouse on a continuous basis and writes the orders on behalf of the customer to ensure warehouses are adequately stocked."
  },
  {
     code: "Volatility",
     Meaning: "The degree to which a particular price/quantity has fluctuated in the past."
  },
  {
     code: "WAPE",
     Meaning: "Weighted Absolute Percent Error - The same as weighted MAPE"
  },
];
/* Fisher–Yates shuffle */
const shuffle = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function FlashcardsGlossary() {
  const router = useRouter();

  const [order, setOrder] = useState<number[]>(() => DATA.map((_, i) => i));
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([order[0]]));

  const card = DATA[order[idx]];
  const total = DATA.length;
  const seenCount = seen.size;
  const pct = seenCount / total;

  const rotation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setSeen(s => new Set(s).add(order[idx]));
    flipToFront();
  }, [idx, order]);

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (flipped) {
      flipToFront();
    } else {
      Animated.timing(rotation, {
        toValue: 180,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setFlipped(true));
    }
  };

  const flipToFront = () => {
    Animated.timing(rotation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => setFlipped(false));
  };

  const prev = () => setIdx(i => Math.max(i - 1, 0));
  const next = () => setIdx(i => Math.min(i + 1, total - 1));

  const randomize = () => {
    const newOrder = shuffle(DATA.map((_, i) => i));
    setOrder(newOrder);
    setIdx(0);
    setSeen(new Set([newOrder[0]]));
    flipToFront();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView contentContainerStyle={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#0F5DC6" />
        </Pressable>
        <Text style={styles.h1}>Glossary Codes</Text>

        <Pressable onPress={flipCard} style={styles.cardWrapper}>
          <View>
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ rotateY: frontInterpolate }],
                  backfaceVisibility: 'hidden',
                },
              ]}
            >
              <Text style={styles.caption}>Glossary Code</Text>
              <Text style={styles.code}>{card.code}</Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.card,
                {
                  backgroundColor: '#FFFFFF',
                  transform: [{ rotateY: backInterpolate }],
                  backfaceVisibility: 'hidden',
                  position: 'absolute',
                  top: 0,
                },
              ]}
            >
              <Text style={styles.caption}>Meaning</Text>
              <Text style={styles.Meaning}>{card.Meaning}</Text>
            </Animated.View>
          </View>
        </Pressable>

        <View style={styles.progressOuter}>
          <View style={[styles.progressInner, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {seenCount} / {total} viewed
        </Text>

        <View style={styles.navRow}>
          <Pressable onPress={prev} disabled={idx === 0}>
            <Text style={[styles.navBtn, idx === 0 && styles.disabled]}>Previous</Text>
          </Pressable>

          <Pressable onPress={randomize}>
            <Ionicons name="shuffle" size={30} color="#0F5DC6" />
          </Pressable>

          <Pressable onPress={next} disabled={idx === total - 1}>
            <Text style={[styles.navBtn, idx === total - 1 && styles.disabled]}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 20, alignItems: 'center' },
  back: { alignSelf: 'flex-start', marginBottom: 12 },
  h1: { fontSize: 22, fontWeight: '600', marginBottom: 24 },
  cardWrapper: {
    width: '100%',
    maxWidth: 360,
    height: 240,
    marginBottom: 24,
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  caption: { fontSize: 12, color: '#64748B', marginBottom: 8 },
  code: { fontSize: 42, fontWeight: '700', color: '#0F172A' },
  Meaning: { fontSize: 18, color: '#334155', textAlign: 'center' },
  progressOuter: {
    width: '100%',
    maxWidth: 360,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },
  progressInner: { height: '100%', backgroundColor: '#06B6D4' },
  progressText: { fontSize: 12, color: '#475569', marginTop: 4, marginBottom: 20 },
  navRow: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 360,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBtn: { fontSize: 20, color: '#0F5DC6' },
  disabled: { color: '#CBD5E1' },
});