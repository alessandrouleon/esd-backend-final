import { PrismaClient } from '@prisma/client';

interface SeedProps {
  id: string;
  code: string;
  description: string;
}

interface UserProps {
  id: string;
  username: string;
  password: string;
  status: string;
  roles: string;
  employeeId: string;
}

interface EmployeeProps {
  id: string;
  name: string;
  registration: string;
  boot: string;
  bracelete: string;
  status: string;
  occupation: string;
  imageId: string | null;
  shiftId: string;
  departmentId: string;
  lineId: string;
}

const prisma = new PrismaClient();

async function seedLine(data: SeedProps) {
  await prisma.line.create({ data });
}

async function seedShift(data: SeedProps) {
  await prisma.shift.create({ data });
}

async function seedDepartment(data: SeedProps) {
  await prisma.department.create({ data });
}

async function seedEmployee(data: EmployeeProps) {
  await prisma.employee.create({
    data,
  });
}

async function seedUser(data: UserProps) {
  await prisma.user.create({
    data,
  });
}

async function main() {
  const lines: SeedProps[] = [
    {
      id: '01',
      code: '01',
      description: '01',
    },
  ];

  const shifts: SeedProps[] = [
    {
      id: '01',
      code: '01',
      description: '01',
    },
  ];

  const departments: SeedProps[] = [
    {
      id: '01',
      code: '01',
      description: 'TI',
    },
  ];

  const users: UserProps[] = [
    {
      id: '01',
      username: 'admin',
      password: '$2b$10$5T/6KSniGHznZyXdBTMOVetp4FrrADIMU/kxDJpYg9rXQUNNfTMBC',
      status: 'ativo',
      roles: 'full',
      employeeId: '01',
    },
  ];

  const employees: EmployeeProps[] = [
    {
      id: '01',
      name: 'Administrador',
      registration: '010101',
      boot: 'OK',
      bracelete: 'OK',
      status: 'ativo',
      occupation: 'Dev TI',
      imageId: null,
      shiftId: '01',
      departmentId: '01',
      lineId: '01',
    },
  ];
  try {
    await Promise.all([
      departments.map(seedDepartment),
      shifts.map(seedShift),
      lines.map(seedLine),
      employees.map(seedEmployee),
      users.map(seedUser),
    ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
