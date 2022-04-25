import { Body, Controller, Get, Post, Put } from '@nestjs/common';

function createData(id: number, name: string, lastName: string, role: string) {
  return { id, name, lastName, role };
}

const data = [
  createData(1, 'Name1', 'LastName1', 'User'),
  createData(2, 'Name2', 'LastName2', 'Admin'),
  createData(3, 'Name3', 'LastName3', 'Manager'),
  createData(4, 'Name4', 'LastName4', 'User'),
  createData(5, 'Name5', 'LastName5', 'User'),
];

@Controller({})
export class AppController {
  @Get('users')
  getUsers() {
    return data;
  }

  @Post('user')
  createUser(@Body() user) {
    user.id = data.length + 1;
    data.push(user);
    return user;
  }

  @Put('user')
  updateUser(@Body() user) {
    const userIndex = data.findIndex((d) => d.id === user.id);
    data[userIndex] = user;
    return user;
  }
}
