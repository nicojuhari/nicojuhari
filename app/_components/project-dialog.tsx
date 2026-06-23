"use client";

import { ExternalLinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/app/_data/projects";

type Props = {
    project: Project | null;
    onClose: () => void;
};

export default function ProjectDialog({ project, onClose }: Props) {
    return (
        <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                {project && (
                    <>
                        <DialogHeader>
                            <div className="flex items-center gap-3 mb-1">
                                {project.logo && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={project.logo}
                                        alt={project.title}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain shrink-0"
                                    />
                                )}
                                <DialogTitle className="text-xl">{project.title}</DialogTitle>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.year}</p>
                        </DialogHeader>

                        <div className="flex flex-wrap gap-1.5 mt-1">
                            {project.stack.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>

                        {project.url && (
                            <Button
                                className="w-full"
                                nativeButton={false}
                                render={<a href={project.url} target="_blank" rel="noopener noreferrer" />}
                            >
                                <ExternalLinkIcon className="w-4 h-4" />
                                Visit {project.title}
                            </Button>
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
