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
    code: "/SAPAPO/AMON1",
    Meaning: "Alert Monitor",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/AMON3 ",
    Meaning: "Alert Overview by Objects",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/AMONMSG_SEND ",
    Meaning: "Send Alerts",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SCMB/ANOT_PROF ",
    Meaning: "Create/Change Alert Notification Profile (User)",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SCMB/ANOTMP ",
    Meaning: "Create/Change Message Profile",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/PE_LOG_DISP ",
    Meaning: "Display PSM Application Log",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/PE_SEL ",
    Meaning: "Define Selections",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SCMB/TDL_BO_COPY ",
    Meaning: "Define Service Profile for Copying Time Series",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SDP94 ",
    Meaning: "Interactive Demand Planning",
    Category: "SAP APO",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST03N ",
    Meaning: "Aggregated Statistics Records Local",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST03G ",
    Meaning: "Aggregated Statistics Records Global",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "STAD ",
    Meaning: "Individual Statistics Records (ABAP Only)",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "STATTRACE ",
    Meaning: "Individual Statistics Records (All) and Traces",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST07 ",
    Meaning: "User Distribution",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST02 ",
    Meaning: "Buffers",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST10 ",
    Meaning: "Table Accesses",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "TU02 ",
    Meaning: "Parameter Changes",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS06 ",
    Meaning: "Activity",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS04 ",
    Meaning: "System Configuration",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS03 ",
    Meaning: "Parameter Changes",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS07 ",
    Meaning: "Activity",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS05 ",
    Meaning: "System Configuration",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "OS01 ",
    Meaning: "LAN Check with PING",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "AL15 ",
    Meaning: "SAPOSCOL Destination",
    Category: "Performance Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST04N ",
    Meaning: "Activity",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB01 ",
    Meaning: "Exclusive Locks",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB02 ",
    Meaning: "Tables/Indexes",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB03 ",
    Meaning: "Parameter Changes",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM21 ",
    Meaning: "System Log",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "ST22 ",
    Meaning: "ABAP Runtime Errors",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "AL11 ",
    Meaning: "SAP Directories",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM50 ",
    Meaning: "Process Overview",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM66 ",
    Meaning: "Global Process Overview",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM51 ",
    Meaning: "SAP Instances",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM04 ",
    Meaning: "Local Users",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "AL08 ",
    Meaning: "Global Users",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RZ10 ",
    Meaning: "System Profile",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SMLG ",
    Meaning: "Logon Groups",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SM69 ",
    Meaning: "Display/Change External Commands",
    Category: "Database",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB12 ",
    Meaning: "Backup Logs",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB13 ",
    Meaning: "Local",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB13C ",
    Meaning: "Central",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB14 ",
    Meaning: "Operations Monitor",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB20 ",
    Meaning: "Create Statistics",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "DB21 ",
    Meaning: "Configuration",
    Category: "DB Admin",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SP01 ",
    Meaning: "Output Controller",
    Category: "Print Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SPAD ",
    Meaning: "Spool Administration",
    Category: "Print Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SE73 ",
    Meaning: "Font Maintenance",
    Category: "Print Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SP11 ",
    Meaning: "TemSe Contents",
    Category: "Print Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "SP12 ",
    Meaning: "TemSe Administration",
    Category: "Print Related",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "MC8K ",
    Meaning: "Detailed Job Log",
    Category: "Background Processing",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RZ01 ",
    Meaning: "Job Scheduling Monitor",
    Category: "Background Processing",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPC ",
    Meaning: "Process Chain Maintenance",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPC_RESTART ",
    Meaning: "Restart Process Chain Run",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPC1 ",
    Meaning: "Process Chain Display",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPC1_NOLOG ",
    Meaning: "Process Chain Maintenance",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPC2 ",
    Meaning: "Process Chain via Process",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPCM ",
    Meaning: "Monitor daily process chains",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "RSPCP ",
    Meaning: "Process Log",
    Category: "Process Chainrelated",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/MSDP_SB",
    Meaning: "Safety Stock Planning",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP94",
    Meaning: "Interactive Supply Network Planning",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SDP94",
    Meaning: "Interactive Supply Network Planning (All Books)",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPSOP",
    Meaning: "Supply and Demand Propagation",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPDRP",
    Meaning: "Distribution Resource Planning (DRP)",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPTLB",
    Meaning: "Interactive Transport Load Builder (TLB)",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPVMI",
    Meaning: "Interactive VMI",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPSA",
    Meaning: "Interactive Scheduling Agreements",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPLLC",
    Meaning: "Determine Low-Level Codes for SNP-Relevant Objects",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP01",
    Meaning: "Supply Network Planning: Planning Run",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP05",
    Meaning: "SNP: Capacity Leveling",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/CTM",
    Meaning: "CTM - Capable-To-Match",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPOP",
    Meaning: "Supply Network Optimization",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPSRC",
    Meaning: "Sourcing of Forecast",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP10",
    Meaning: "Propagation of Shelf Life Data",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP07",
    Meaning: "SNP Aggregation",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP08",
    Meaning: "Single Level Supply and Demand Mapping",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP06",
    Meaning: "SNP Disaggregation",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP09",
    Meaning: "Resource Disaggregation",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP03",
    Meaning: "Deployment Optimization",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP02",
    Meaning: "Deployment",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP042",
    Meaning: "Transport Load Builder",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/DPLSPLIT",
    Meaning: "Prioritize Deployment Stock Transfers",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPAPLOG",
    Meaning: "SNP Application Logs",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPOPLOG",
    Meaning: "SNP Optimizer Logs",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/OPTEXPLAIN",
    Meaning: "Explanation of SNP Optimization Results",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/RLCDEL",
    Meaning: "Delete Transaction Data",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSKEYFMAIN",
    Meaning: "Mass Maintenance of Time Series Key Figures",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNPFCST",
    Meaning: "Release SNP-Confirmed Forecast to DP",
    Category: "SNP related transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "",
    Meaning: "",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/MSDP_ADMIN",
    Meaning: "S&DP Administration",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TR30",
    Meaning: "Maintain Time Buckets Profile for DP/SNP",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TR32",
    Meaning: "Periodicities for Planning Area",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/ADVM",
    Meaning: "Macro Workbench",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SDP8B",
    Meaning: "Define Planning Book",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SDPPLBK",
    Meaning: "Assign User to Planning Book",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP8_94000284",
    Meaning: "Change Display of Parameters in Interactive TLB",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SDPALRP",
    Meaning: "Assign Planners to Alert Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/AP",
    Meaning: "Maintain PO Number Assignment for VMI in SAP APO",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000141",
    Meaning: "Define SNP Rounding Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_86000062",
    Meaning: "Define SNP Deployment Optimizer Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TLBPRF",
    Meaning: "Define TLB Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000095",
    Meaning: "SNP Define Lot-Size Profiles (Transportation Lanes)",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000102",
    Meaning: "Define SNP Optimizer Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/OPT_PRIOPROF",
    Meaning: "Define SNP Priorities Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000101",
    Meaning: "Define SNP Cost Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/BOUND",
    Meaning: "Define Optimization Bound Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP_PENGRP",
    Meaning: "Define SNP Penalty Cost Group Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000142",
    Meaning: "Define Requirements Strategies",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_86000053",
    Meaning: "Define SNP Capacity Leveling Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP_SHLFPROF",
    Meaning: "Define SNP Shelf Life Profile",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/SNP_SFT_PROF",
    Meaning: "Define SFT Planning Profiles",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSINIT",
    Meaning: "Initialize Planning Area",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSDEINIT",
    Meaning: "Deinitialize Planning Area",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSCONS",
    Meaning: "Consistency Check for Time Series Network",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSLCREORGSNP",
    Meaning: "Check liveCache Time Series Data (SNP)",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "/SAPAPO/TSLOCKS",
    Meaning: "Lock Monitor (DP and SNP)",
    Category: "SNP Customizing Transactions",
    Source: "Rohan - From the SAP Wiki with Edits"
  },
  {
    code: "S_AP9_75000138",
    Meaning: "Maintain Planning Calendar (Time Stream)",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/SDPUSET",
    Meaning: "User Settings for Interactive Planning",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/SDPALPR",
    Meaning: "Assign Planners to Alert Profiles",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8V",
    Meaning: "Calculate Proportional Factors",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC96B",
    Meaning: "Maintain Forecast Profiles",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MSDP_FCST2",
    Meaning: "Assign Forecast Profiles to a Selection",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MSDP_FCST1",
    Meaning: "Lifecycle Planning",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/SDP_SEASON",
    Meaning: "Seasonal Planning",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC7B",
    Meaning: "Product Split",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC7A",
    Meaning: "Location Split",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "S_AP9_75000146",
    Meaning: "Data Warehousing Workbench",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "RSPC",
    Meaning: "Maintain Process Chains",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/TSCUBE",
    Meaning: "Load Data from InfoCube",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/TSCOPY",
    Meaning: "Copy/Version Management",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/RLGCOPY",
    Meaning: "Data Realignment",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8T",
    Meaning: "Define Activities for Mass Processing",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8D",
    Meaning: "Create Demand Planning in the Background",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8J",
    Meaning: "Copy Demand Planning in the Background",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8G",
    Meaning: "Schedule Demand Planning in the Background",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "SM37 ",
    Meaning: "Job Overview of Demand Planning in the Background",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC8K",
    Meaning: "Manage Job Logs",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC90",
    Meaning: "Release Demand Planning to Supply Network Planning",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP34",
    Meaning: "Promotion Planning",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP42",
    Meaning: "Promotion Management",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP41B",
    Meaning: "Promotion Reports",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP32",
    Meaning: "Maintain Cannibalization Group",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP31",
    Meaning: "Maintain Promotion Attribute Types",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP33",
    Meaning: "Maintain Promotion Key Figures",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MP40",
    Meaning: "Maintain Promotion Base",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/VERDELLD",
    Meaning: "Delete Planning Version",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/VERCOP",
    Meaning: "Copy Planning Version",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MVM",
    Meaning: "Model and Version Management",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MAT1",
    Meaning: "Product",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/MC62",
    Meaning: "Maintain Characteristic Values",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: "/SAPAPO/IPM01",
    Meaning: "Maintain Master Data for CBF",
    Category: "SAP APO",
    Source: "Mark Sir"
  },
  {
    code: ""
  }
];

const shuffle = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function FlashcardsAPO() {
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
        <Text style={styles.h1}>APO Codes</Text>

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
              <Text style={styles.caption}>APO Code</Text>
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
