interface SkillBadgeProps {
  skill: string;
  level?: number;
}

export default function SkillBadge({ skill, level }: SkillBadgeProps) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <span className="font-medium text-gray-800 dark:text-gray-200">{skill}</span>
      {level && (
        <div className="flex items-center space-x-2">
          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary dark:bg-primary-dark rounded-full"
              style={{ width: `${level}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{level}%</span>
        </div>
      )}
    </div>
  );
}