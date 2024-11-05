import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle, Clock, Bell, Filter, Search, MoreVertical, 
         ChevronDown, BarChart2, Settings, Trash2, Eye, BellOff, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedView, setSelectedView] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [notifications, setNotifications] = useState(true);

  // Simulated real-time data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'High CPU Usage',
      description: 'Server CPU usage exceeded 90%',
      severity: 'high',
      time: '2 minutes ago',
      status: 'active',
      system: 'Production Server',
      details: 'CPU utilization spike detected on primary application server.',
      metrics: {
        cpu: 92,
        memory: 76,
        disk: 45
      },
      history: [
        { timestamp: '2024-03-01T10:00:00', value: 85 },
        { timestamp: '2024-03-01T10:05:00', value: 88 },
        { timestamp: '2024-03-01T10:10:00', value: 92 }
      ],
      acknowledgements: [],
      assignee: null
    },
    {
      id: 2,
      title: 'Network Latency',
      description: 'Increased latency detected on main network',
      severity: 'medium',
      time: '15 minutes ago',
      status: 'investigating',
      system: 'Network Infrastructure',
      details: 'Average response time increased by 200ms across all endpoints.',
      metrics: {
        latency: 200,
        packetLoss: 2,
        bandwidth: 85
      },
      history: [
        { timestamp: '2024-03-01T09:45:00', value: 150 },
        { timestamp: '2024-03-01T09:50:00', value: 180 },
        { timestamp: '2024-03-01T09:55:00', value: 200 }
      ],
      acknowledgements: ['John Doe'],
      assignee: 'John Doe'
    },
    {
      id: 3,
      title: 'Storage Warning',
      description: 'Storage capacity reaching 85%',
      severity: 'low',
      time: '1 hour ago',
      status: 'resolved',
      system: 'Storage Cluster',
      details: 'Automatic cleanup scheduled for non-critical data.',
      metrics: {
        storage: 85,
        iops: 1200,
        throughput: 89
      },
      history: [
        { timestamp: '2024-03-01T09:00:00', value: 80 },
        { timestamp: '2024-03-01T09:30:00', value: 83 },
        { timestamp: '2024-03-01T10:00:00', value: 85 }
      ],
      acknowledgements: ['Jane Smith'],
      assignee: 'Jane Smith'
    }
  ]);

  // Simulated metrics
  const metrics = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    investigating: alerts.filter(a => a.status === 'investigating').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setAlerts(prev => prev.map(alert => ({
          ...alert,
          metrics: {
            ...alert.metrics,
            cpu: alert.metrics.cpu ? Math.min(100, alert.metrics.cpu + Math.random() * 2 - 1) : undefined
          }
        })));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      low: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: <AlertTriangle className="h-5 w-5 text-red-500" />,
      investigating: <Clock className="h-5 w-5 text-orange-500" />,
      resolved: <CheckCircle className="h-5 w-5 text-green-500" />,
    };
    return icons[status] || <AlertCircle className="h-5 w-5 text-gray-500" />;
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;
    const matchesView = selectedView === 'all' || 
                       (selectedView === 'unresolved' && alert.status !== 'resolved') ||
                       (selectedView === 'assigned' && alert.assignee);
    return matchesSearch && matchesSeverity && matchesStatus && matchesView;
  });

  const AlertCard = ({ alert }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg border border-gray-100 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {getStatusIcon(alert.status)}
          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <h3 className="font-semibold dark:text-white">{alert.title}</h3>
              <Badge variant="secondary" className={getSeverityColor(alert.severity)}>
                {alert.severity.toUpperCase()}
              </Badge>
              <Badge variant="outline">
                {alert.system}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{alert.description}</p>
            
            {alert.metrics && (
              <div className="mt-3 space-y-2">
                {Object.entries(alert.metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-20">{key}:</span>
                    <Progress value={value} className="w-32" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{value}%</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm mt-3">
              <span className="text-gray-500 dark:text-gray-400">{alert.time}</span>
              {alert.assignee && (
                <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <Eye className="h-4 w-4" />
                  {alert.assignee}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedAlert(alert)}
                >
                  <BarChart2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Metrics</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Acknowledge</DropdownMenuItem>
              <DropdownMenuItem>Assign to me</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Snooze</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Clear Alert</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-6 w-6 text-blue-500" />
              <CardTitle>Alert Center</CardTitle>
            </div>
            
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Auto-refresh</span>
                      <Switch
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Updates data every 5 seconds
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>

              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{metrics.total}</div>
                <p className="text-xs text-gray-500">Total Alerts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-500">{metrics.active}</div>
                <p className="text-xs text-gray-500">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-orange-500">{metrics.investigating}</div>
                <p className="text-xs text-gray-500">Investigating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-500">{metrics.resolved}</div>
                <p className="text-xs text-gray-500">Resolved</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses<SelectItem value="active">Active</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
              <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
              <TabsTrigger value="snoozed">Snoozed</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <AnimatePresence mode="popLayout">
              {filteredAlerts.length > 0 ? (
                <motion.div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No alerts found</h3>
                  <p className="text-gray-500 dark:text-gray-400">No alerts match your current filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Alert Settings</DialogTitle>
                  <DialogDescription>
                    Configure your alert preferences and notifications
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Notifications</h4>
                      <p className="text-sm text-gray-500">Enable alert notifications</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Auto Refresh</h4>
                      <p className="text-sm text-gray-500">Automatically refresh alerts</p>
                    </div>
                    <Switch
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>

      {selectedAlert && (
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Alert Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(selectedAlert.status)}
                <h2 className="text-xl font-semibold">{selectedAlert.title}</h2>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Details</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedAlert.details}</p>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Metrics</h4>
                    {Object.entries(selectedAlert.metrics).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-500 w-24">{key}:</span>
                        <Progress value={value} className="w-full" />
                        <span className="text-sm text-gray-600 w-12">{value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">History</h3>
                  <div className="space-y-2">
                    {selectedAlert.history.map((record, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="font-medium">{record.value}%</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Acknowledgements</h3>
                    {selectedAlert.acknowledgements.length > 0 ? (
                      <div className="space-y-1">
                        {selectedAlert.acknowledgements.map((ack, index) => (
                          <div key={index} className="text-sm text-gray-600">{ack}</div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No acknowledgements yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Alerts;