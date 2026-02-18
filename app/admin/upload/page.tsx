import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

export default function MassiveUploadPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[var(--primary)]">Carga Masiva</h1>
        <p className="text-gray-500">Importa participantes desde archivos Excel o CSV para generar certificados automáticamente.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Subir Archivo</CardTitle>
            <CardDescription>Selecciona el archivo con los datos de los estudiantes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <Upload className="h-12 w-12" />
              </div>
              <p className="text-sm font-medium text-gray-900">
                Arrastra tu archivo aquí o <span className="text-[var(--accent)]">haz clic para buscar</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Soporta .xlsx, .csv (Max 5MB)</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <FileSpreadsheet className="h-5 w-5" />
              <span className="font-medium">Plantilla_Carga_Masiva.xlsx</span>
              <Button variant="link" className="ml-auto text-blue-700 h-auto p-0">Descargar</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Resumen de Carga</CardTitle>
            <CardDescription>Vista previa de los datos detectados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Filas detectadas:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Columnas válidas:</span>
                <span className="font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> 0/5
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Errores:</span>
                <span className="font-medium text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> 0
                </span>
              </div>
            </div>
            <Button className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90" disabled>
              Procesar y Generar Certificados
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Cargas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 text-center py-8">
            No hay cargas recientes.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
