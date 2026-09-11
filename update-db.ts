import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const items = await prisma.menuItem.findMany();
    
    for (const item of items) {
        if (item.name.toLowerCase().includes('banku')) {
            console.log('Updating Banku:', item.name);
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl: '/menu/banku-soup.png' }
            });
        }
        if (item.name.toLowerCase().includes('poundo')) {
            console.log('Updating Poundo:', item.name);
            await prisma.menuItem.update({
                where: { id: item.id },
                data: { imageUrl: '/menu/poundo-yam-soup.png' }
            });
        }
    }
    console.log('Update complete.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
