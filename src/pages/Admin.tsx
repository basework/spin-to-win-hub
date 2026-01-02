import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Prize, Lead, getPrizes, savePrizes, getLeads } from '@/lib/prizeStore';
import { ArrowLeft, Plus, Trash2, Save, Users, Gift, Download } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setPrizes(getPrizes());
    setLeads(getLeads());
  }, []);

  const updatePrize = (id: string, field: keyof Prize, value: string | number) => {
    setPrizes(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const addPrize = () => {
    const newPrize: Prize = {
      id: crypto.randomUUID(),
      label: 'NEW PRIZE',
      code: 'CODE123',
      probability: 10,
      color: 'hsl(200 80% 50%)',
    };
    setPrizes(prev => [...prev, newPrize]);
  };

  const removePrize = (id: string) => {
    if (prizes.length <= 2) {
      toast.error('You need at least 2 prizes on the wheel');
      return;
    }
    setPrizes(prev => prev.filter(p => p.id !== id));
  };

  const handleSavePrizes = () => {
    const total = prizes.reduce((sum, p) => sum + p.probability, 0);
    if (total !== 100) {
      toast.warning(`Probabilities should add up to 100%. Current: ${total}%`);
    }
    savePrizes(prizes);
    toast.success('Prizes saved successfully!');
  };

  const exportLeads = () => {
    const csv = [
      ['Email', 'Phone', 'Prize', 'Code', 'Date', 'Claimed'].join(','),
      ...leads.map(l => [
        l.email,
        l.phone || '',
        l.prize,
        l.prizeCode,
        new Date(l.timestamp).toLocaleString(),
        l.claimed ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Leads exported successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <h1 className="text-2xl font-display text-gradient-gold">ADMIN PANEL</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <Users className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{leads.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Prizes Won</CardTitle>
              <Gift className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {leads.filter(l => l.prizeCode).length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Prizes</CardTitle>
              <Gift className="w-5 h-5 text-electric" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{prizes.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prizes" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="prizes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Prizes
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Leads
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prizes">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Manage Prizes</CardTitle>
                    <CardDescription>Configure the prizes on your spin wheel</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addPrize} variant="outline" className="border-border text-foreground hover:bg-muted">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Prize
                    </Button>
                    <Button onClick={handleSavePrizes} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prizes.map((prize) => (
                    <div key={prize.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <div 
                        className="w-8 h-8 rounded-full shrink-0" 
                        style={{ backgroundColor: prize.color }}
                      />
                      <Input
                        value={prize.label}
                        onChange={(e) => updatePrize(prize.id, 'label', e.target.value)}
                        className="flex-1 bg-background border-border text-foreground"
                        placeholder="Prize label"
                      />
                      <Input
                        value={prize.code}
                        onChange={(e) => updatePrize(prize.id, 'code', e.target.value)}
                        className="w-32 bg-background border-border text-foreground"
                        placeholder="Code"
                      />
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={prize.probability}
                          onChange={(e) => updatePrize(prize.id, 'probability', parseInt(e.target.value) || 0)}
                          className="w-20 bg-background border-border text-foreground"
                          min={0}
                          max={100}
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                      <Input
                        type="color"
                        value={prize.color.startsWith('hsl') ? '#f59e0b' : prize.color}
                        onChange={(e) => updatePrize(prize.id, 'color', e.target.value)}
                        className="w-12 h-10 p-1 bg-background border-border cursor-pointer"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePrize(prize.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Total probability: {prizes.reduce((sum, p) => sum + p.probability, 0)}% (should be 100%)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Collected Leads</CardTitle>
                    <CardDescription>Users who spun the wheel</CardDescription>
                  </div>
                  <Button onClick={exportLeads} variant="outline" className="border-border text-foreground hover:bg-muted">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {leads.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No leads collected yet. Share your spin wheel!
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="text-muted-foreground">Email</TableHead>
                        <TableHead className="text-muted-foreground">Phone</TableHead>
                        <TableHead className="text-muted-foreground">Prize</TableHead>
                        <TableHead className="text-muted-foreground">Code</TableHead>
                        <TableHead className="text-muted-foreground">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.slice().reverse().map((lead) => (
                        <TableRow key={lead.id} className="border-border">
                          <TableCell className="text-foreground">{lead.email}</TableCell>
                          <TableCell className="text-foreground">{lead.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {lead.prize}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-muted-foreground">{lead.prizeCode || '-'}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(lead.timestamp).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
