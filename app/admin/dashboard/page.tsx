import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Upload, FilePlus, Download, Search, FileText, Users } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--primary)]">Dashboard</h1>
          <p className="text-gray-500">Bienvenido al panel de administración de SIGCE.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2">
            <FilePlus className="h-4 w-4" />
            Nuevo Certificado
          </Button>
          <Button className="gap-2 bg-[var(--accent)] hover:bg-[var(--accent)]/90">
            <Upload className="h-4 w-4" />
            Carga Masiva
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Certificados Emitidos
            </CardTitle>
            <FileText className="h-4 w-4 text-[var(--accent)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--primary)]">1,248</div>
            <p className="text-xs text-green-600 font-medium">+12% este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pendientes de Aprobación
            </CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--primary)]">42</div>
            <p className="text-xs text-orange-600 font-medium">-5% desde ayer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Programas Activos
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[var(--primary)]">28</div>
            <p className="text-xs text-gray-500 font-medium">En 3 sedes</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Certificates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Certificados Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Folio</TableHead>
                <TableHead>Participante</TableHead>
                <TableHead>Programa</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  folio: "SIGCE-2023-8492",
                  name: "Juan Pérez Rodríguez",
                  program: "Diplomado en Ciberseguridad",
                  date: "15 Oct, 2023",
                  status: "Emitido",
                },
                {
                  folio: "SIGCE-2023-1102",
                  name: "Carlos Jiménez",
                  program: "Criminología Educativa",
                  date: "08 Oct, 2023",
                  status: "Emitido",
                },
                {
                  folio: "SIGCE-2023-0987",
                  name: "Ana Peralta",
                  program: "Kubernetes y Orquestación",
                  date: "05 Oct, 2023",
                  status: "Pendiente",
                },
              ].map((cert) => (
                <TableRow key={cert.folio}>
                  <TableCell className="font-medium">{cert.folio}</TableCell>
                  <TableCell>{cert.name}</TableCell>
                  <TableCell>{cert.program}</TableCell>
                  <TableCell>{cert.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      cert.status === 'Emitido' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cert.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
