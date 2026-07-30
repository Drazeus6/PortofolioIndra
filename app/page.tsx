import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { SkillMatrixSection } from '@/components/sections/SkillMatrixSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <TimelineSection />
      <SkillMatrixSection />
    </>
  );
}
