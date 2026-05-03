import re
import os

fixes = [
    # Customer360.tsx
    ('src/pages/admin/Customer360.tsx', r"render: \(val: any, row: any\) => \{", r"render: (_val: any, row: any) => {"),
    
    # LeadManagement.tsx
    ('src/pages/admin/LeadManagement.tsx', r"UserPlus, Search, Filter,", r""),
    ('src/pages/admin/LeadManagement.tsx', r"MoreHorizontal, Phone, Mail, Clock,", r"Phone,"),
    ('src/pages/admin/LeadManagement.tsx', r"AlertCircle, CheckCircle2, User, Zap", r"AlertCircle, Zap"),
    ('src/pages/admin/LeadManagement.tsx', r"const handleStatusChange = \(leadId: number, status: string\) => \{[\s\S]*?\};", r""),
    
    # PolicyManagement.tsx
    ('src/pages/admin/PolicyManagement.tsx', r"Shield, Clock, Search, Filter,", r"Shield, Clock,"),
    ('src/pages/admin/PolicyManagement.tsx', r"Download, FileText, CheckCircle2, AlertCircle,", r"Download, AlertCircle,"),
    ('src/pages/admin/PolicyManagement.tsx', r"MoreVertical, ExternalLink, Activity", r"Activity"),

    # TeamPerformance.tsx
    ('src/pages/admin/TeamPerformance.tsx', r"BarChart3, TrendingUp, Users, Target,", r"TrendingUp, Users, Target,"),
    ('src/pages/admin/TeamPerformance.tsx', r"Award, Zap, Star, ArrowUpRight, ArrowDownRight,", r"Award, Zap, Star,"),
    ('src/pages/admin/TeamPerformance.tsx', r"PieChart, ChevronRight", r""),
    ('src/pages/admin/TeamPerformance.tsx', r"Tooltip, ResponsiveContainer, Cell, LineChart, Line", r"Tooltip, ResponsiveContainer, Cell"),

    # AgentCommission.tsx
    ('src/pages/agent/AgentCommission.tsx', r"IndianRupee, TrendingUp, Calendar, Download", r"IndianRupee, TrendingUp, Download"),

    # AgentOverview.tsx
    ('src/pages/agent/AgentOverview.tsx', r"TrendingUp, Shield, IndianRupee, Zap,", r"Shield, IndianRupee, Zap,"),

    # MyCustomers.tsx
    ('src/pages/agent/MyCustomers.tsx', r"Users, Shield, Clock, Search,", r"Users,"),
    ('src/pages/agent/MyCustomers.tsx', r"Mail, PhoneCall, ChevronRight, FileText", r"FileText"),

    # MyLeads.tsx
    ('src/pages/agent/MyLeads.tsx', r"TrendingUp, Phone, Mail, FileText,", r"Phone, Mail, FileText,"),
    ('src/pages/agent/MyLeads.tsx', r"CheckCircle2, Clock, Calendar, MessageSquare,", r"Calendar, MessageSquare,"),

    # QuoteGenerator.tsx
    ('src/pages/agent/QuoteGenerator.tsx', r"FileText, Shield, User, MapPin,", r"Shield,"),

    # Tasks.tsx
    ('src/pages/agent/Tasks.tsx', r"CheckSquare, Calendar, Plus, Clock,", r"CheckSquare, Calendar, Plus,"),
    ('src/pages/agent/Tasks.tsx', r"PhoneCall, Mail, User, AlertCircle,", r"AlertCircle,"),
    ('src/pages/agent/Tasks.tsx', r"MoreHorizontal, Trash2", r"Trash2, CheckCircle2"),

    # ClaimsSupport.tsx
    ('src/pages/csr/ClaimsSupport.tsx', r"FileText, Shield, Clock, AlertCircle,", r"FileText, Shield, AlertCircle,"),
    ('src/pages/csr/ClaimsSupport.tsx', r"CheckCircle2, Upload, MessageSquare, ExternalLink", r"Upload, ExternalLink"),

    # Renewals.tsx
    ('src/pages/csr/Renewals.tsx', r"Clock, PhoneCall, Mail, AlertCircle, Calendar, Shield", r"Mail, AlertCircle, Shield"),

    # TicketSystem.tsx
    ('src/pages/csr/TicketSystem.tsx', r"MessageSquare, Clock, AlertCircle,", r""),
    ('src/pages/csr/TicketSystem.tsx', r"CheckCircle2, Reply, Paperclip", r"Reply, Paperclip"),

    # Config.tsx
    ('src/pages/super-admin/Config.tsx', r"Shield, Bell, Lock, Database, Globe,", r"Bell, Lock, Database, Globe,"),
    ('src/pages/super-admin/Config.tsx', r"Cpu, Smartphone, Zap, CheckCircle2, AlertCircle,", r"Cpu, Smartphone, Zap, CheckCircle2,"),

    # Overview.tsx
    ('src/pages/super-admin/Overview.tsx', r"Users, Shield, IndianRupee, TrendingUp,", r"Users, Shield, IndianRupee,"),
    ('src/pages/super-admin/Overview.tsx', r"BarChart3, Clock, AlertCircle, PieChart,", r"Clock, AlertCircle,"),
    ('src/pages/super-admin/Overview.tsx', r"ArrowUpRight, ArrowDownRight, Globe, Zap", r"ArrowUpRight, Globe, Zap"),
    ('src/pages/super-admin/Overview.tsx', r"Cell, PieChart as RePieChart, Pie", r"Cell"),
    ('src/pages/super-admin/Overview.tsx', r"\{AGENT_PERFORMANCE.map\(\(entry, index\) => \(", r"{AGENT_PERFORMANCE.map((_entry, index) => ("),
    ('src/pages/super-admin/Overview.tsx', r"import \{ usePlatform \} from '../../store/PlatformContext';", r"import { usePlatform } from '../../store/PlatformContext';\nimport { cn } from '../../utils/helpers';"),

    # Reports.tsx
    ('src/pages/super-admin/Reports.tsx', r"BarChart3, Download, Filter, FileText, Calendar, Shield, IndianRupee, Clock", r"BarChart3, Download, Calendar, Shield, Clock"),

    # Settings.tsx
    ('src/pages/super-admin/Settings.tsx', r"Shield, CreditCard, Landmark, Plus, Percent, Mail, MessageSquare", r"Shield, Landmark, Plus, Percent, Mail, MessageSquare"),

    # UserManagement.tsx
    ('src/pages/super-admin/UserManagement.tsx', r"Plus, UserPlus, Shield, Mail, MapPin, CheckCircle2, MoreHorizontal", r"UserPlus, Shield, MapPin"),

    # PlatformContext.tsx
    ('src/store/PlatformContext.tsx', r"import React, \{ createContext, useContext, useState, ReactNode \} from 'react';", r"import React, { createContext, useContext, useState, type ReactNode } from 'react';"),
]

for file_path, search, replace in fixes:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try literal match first, if not regex
    new_content = re.sub(search, replace, content, flags=re.MULTILINE)
    
    # Simple fix for trailing commas in imports
    new_content = re.sub(r'import \{[\s,]*\} from', r'// empty import', new_content)
    new_content = re.sub(r',\s*}', ' }', new_content)
    new_content = re.sub(r'\{\s*,', '{ ', new_content)
    new_content = re.sub(r',\s*,', ',', new_content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No changes made to {file_path} for '{search}'")

