import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mediaApi } from '@/services/api';
import type { Media } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Star } from 'lucide-react';

export default function MediaList() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMedias();
  }, []);

  const loadMedias = async () => {
    try {
      const data = await mediaApi.list();
      setMedias(data);
    } catch (error) {
      console.error('Erro ao carregar mídias:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Mídias Disponíveis</h1>
          <p className="text-muted-foreground">Explore e avalie conteúdos</p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Carregando...</div>
        ) : medias.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Nenhuma mídia encontrada.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {medias.map((media) => (
              <Link key={media.id} to={`/midia/${media.id}`}>
                <Card className="h-full transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2">{media.title}</CardTitle>
                      {media.averageRating !== undefined && media.averageRating > 0 && (
                        <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          {media.averageRating.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-1">
                      Por {media.user?.name || 'Usuário'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{media.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{media.totalReviews || 0} avaliações</span>
                      <span>•</span>
                      <span>{new Date(media.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
